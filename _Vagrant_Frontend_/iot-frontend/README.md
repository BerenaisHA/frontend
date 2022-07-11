<div style="text-align: center;">
<img src="src/assets/logo.png" width="300px" />
</div>

# Requisitos previos
1. Node versión >= 12 <a href="https://nodejs.org/es" target="_blank">Página oficial</a>
2. Vue CLI versión 4 <a href="https://cli.vuejs.org/guide/installation.html" target="_blank">Página oficial</a>
<br><br>
# Configuración inicial frontend

1. Ejecutar comando `npm install` para instalación de librerías
2. Configurar archivo .env ubicado en el directorio raíz del proyecto
3. Configuración de IP pública en archivo vue.config.js ubicado en el directorio raíz con el siguiente formato:
```
module.exports = {
	devServer: {
		host: '0.0.0.0',
		port: 8080,
		public: 'ip.google:8080'
	}
}
```
4. Iniciar proyecto en fase de desarrollo con el comando `npm run serve`