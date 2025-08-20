# UnigisDb (.bacpac)

Este archivo contiene la base de datos **UnigisDb** (esquema + datos) en formato BACPAC.

## ¿Qué es BACPAC?
Paquete de Azure/SQL Server que permite importar/exportar la BD completa sin ejecutar scripts manuales.

## Importar en SQL Server (SSMS)
1. Click derecho en **Databases** → **Import Data-tier Application…**
2. Selecciona `UnigisDb-YYYY-MM-DD.bacpac` → Next → Finish.

## Importar en Azure SQL
1. Azure Portal → SQL servers → (tu servidor) → **Import database**.
2. Sube el `.bacpac` y sigue el wizard (nombre, performance tier).