# Sistema de Gestión de Barrial

Este proyecto es una aplicación móvil desarrollada para un municipio, que permite a los vecinos informar y realizar el seguimiento de problemas de infraestructura y consultar los servicios ofrecidos por los comercios y profesionales del municipio.

## Tabla de Contenidos
- [Descripción del Proyecto](#descripción-del-proyecto)
- [Funcionalidades](#funcionalidades)
- [Tipos de Usuarios](#tipos-de-usuarios)
- [Estructura de la API Rest](#estructura-de-la-api-rest)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Descripción del Proyecto
El desarrollo solicitado complementará la estructura de software existente con una aplicación para dispositivos móviles que permita a los vecinos informar y controlar el seguimiento de sus reclamos, además de permitir que los comercios y profesionales de la zona se inscriban para ofrecer sus servicios.

## Funcionalidades
- **Generación de Reclamos:** Los vecinos pueden realizar reclamos sobre problemas de infraestructura como calles, plazas, oficinas públicas, etc.
- **Seguimiento de Reclamos:** Monitoreo del estado de los reclamos realizados.
- **Generación de Denuncias:** Los vecinos pueden denunciar a otros vecinos o comercios.
- **Promoción de Servicios:** Comercios y profesionales pueden publicitar sus servicios.
- **Consulta de Promociones:** Cualquier usuario puede acceder a las promociones ofrecidas por comercios y profesionales.

## Tipos de Usuarios
- **Vecinos:** Pueden generar reclamos y denuncias, y promocionar servicios.
- **Inspectores:** Pueden gestionar reclamos pero no pueden promocionar servicios.
- **Público General:** Puede acceder a las promociones sin necesidad de registrarse.

## Estructura de la API Rest
La API Rest proporcionará los siguientes endpoints principales:
- **/auth:** Manejo de autenticación y generación de claves de acceso.
- **/claims:** Gestión de reclamos, incluyendo creación, envío y consulta.
- **/reports:** Gestión de denuncias, incluyendo creación y consulta.
- **/promotions:** Gestión de promociones de comercios y servicios profesionales.
  
Cada endpoint contará con parámetros específicos, retornos y códigos de estado (200, 404, etc.).
