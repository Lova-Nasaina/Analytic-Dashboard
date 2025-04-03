from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import json
import numpy as np
from sqlalchemy import create_engine

engine = create_engine("mysql+pymysql://root:@localhost:3306/unicef_db", echo=True)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


query = """
SELECT *
FROM maladie m
JOIN region r ON m.CODE_REGION = r.CODE_REGION
"""
queryCrenas = """
SELECT * 
FROM nut_crenas 
"""

queryCrenis = """
SELECT * 
FROM nut_crenis 
"""

df_maladie = pd.read_sql(query, engine)
df_nutCrenas = pd.read_sql(queryCrenas, engine)
df_nutcrenis = pd.read_sql(queryCrenis, engine)

@app.get("/regionNut")
async def get_region():

    regions = df_nutCrenas.groupby("region")["district"].unique().to_dict()
    regions = { regions : list(districts) for regions , districts in regions.items() }

    return regions

@app.get("/grouped_data")
async def get_allData():
    grouped_data = {
        district: {
            str(annee): dict(zip(group["moi"].astype(str), group["tot_adm"]))
            for annee, group in sub_df.groupby("annee")
        }
        for district, sub_df in df_nutCrenas.groupby("district")
    }
    return grouped_data

@app.get("/district/crenas/{district_name}")
async def get_district_data(district_name : str):

    data_filtered = df_nutCrenas[df_nutCrenas['district'] == district_name]
    myData = data_filtered.groupby(['annee', 'moi'])["tot_adm"].sum().reset_index()
    grouped = myData.groupby('annee')
    result = {}

    for year , group in grouped:
        
        group_sorted = group.sort_values("moi")
        totadm_monthly  = group_sorted.set_index("moi")["tot_adm"].to_dict()
        # print(" tot monthly : ",totadm_monthly)
        result[year] = totadm_monthly

    return result

@app.get("/district/crenis/{district_name}")
async def get_district_data(district_name : str):

    data_filtered = df_nutcrenis[df_nutcrenis['district'] == district_name]
    myData = data_filtered.groupby(['annee', 'moi'])["tot_adm"].sum().reset_index()
    grouped = myData.groupby('annee')
    result = {}

    for year , group in grouped:
        
        group_sorted = group.sort_values("moi")
        totadm_monthly  = group_sorted.set_index("moi")["tot_adm"].to_dict()
        
        result[year] = totadm_monthly

    return result


@app.get("/data/{annee}")
async def get_data(annee : int):
    total = []

    df_filtered = df_maladie[df_maladie["Année"] == annee]
    result = df_filtered.groupby("LIBELLE_REGION")[["IRA", "Diarrhée", "Palu"]].sum().reset_index()

    maladie = ["IRA", "Palu", "Diarrhée"]

    for val in maladie:
        som = df_filtered[val].sum()
        total.append(som)    

    generale_annee = {key: value for key, value in zip(maladie, total)}

    return {
        "anne" : annee,
        "Generale" : generale_annee,
        "tableau" : result.to_dict(orient="records")
    }


@app.get("/nutrition/{annee}/{district}")
async def nutrition(annee : int , district : str):
    print(f"annee : {annee} | district : {district}")

    filterData = df_nutCrenas.groupby(['annee', 'moi', 'district'])['tot_adm'].sum().reset_index()
    data =filterData[(filterData['district'] == district) & ( filterData['annee'] == annee)]
    labels = data['moi'].tolist()
    values = data['tot_adm'].tolist()

    
    chart_data = {
        'labels': labels,
        'datasets': [
            {
                'label': 'tot_adm par mois',
                'data': values,            
            }
        ]
    }

    
    json_data = json.dumps(chart_data)
    print(f"les donne {json_data}")
    return chart_data



