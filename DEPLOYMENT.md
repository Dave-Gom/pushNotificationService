# 🚀 Guía de Despliegue en Producción

Este documento detalla cómo desplegar el servicio de notificaciones push en producción con código minificado y optimizado.

## 📋 Prerequisitos

- Docker y Docker Compose instalados
- Variables de entorno configuradas
- Acceso al servidor de producción

## 🛠️ Proceso de Despliegue

### 1. Preparación del Entorno

Instala las dependencias necesarias para el build:
```bash
npm install
```

### 2. Build Local (Opcional)

Para probar el build localmente antes del despliegue:

```bash
# Limpiar builds anteriores
npm run clean

# Compilar TypeScript
npm run build

# O compilar con minificación (requiere instalar terser)
npm run build:prod
```

### 3. Despliegue con Docker

#### Opción A: Build y Deploy en un solo comando
```bash
# Usar docker-compose para producción
docker-compose -f docker-compose.prod.yml up --build -d
```

#### Opción B: Build manual y deploy
```bash
# 1. Construir la imagen
docker build -t padelsys-notifications:latest --target production .

# 2. Ejecutar el contenedor
docker run -d \
  --name padelsys-notifications \
  -p 8000:3000 \
  --env-file .env.production \
  --restart unless-stopped \
  padelsys-notifications:latest
```

### 4. Variables de Entorno

Crea un archivo `.env.production` con las siguientes variables:

```env
NODE_ENV=production
DB_HOST=tu_host_db
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
DB_DATABASE=tu_database

# Configuración de Firebase
FIREBASE_PROJECT_ID=tu_project_id
FIREBASE_PRIVATE_KEY_ID=tu_private_key_id
# ... otras variables de Firebase
```

## 🔍 Verificación del Despliegue

### Health Check
El contenedor incluye un health check automático. Verifica el estado:

```bash
# Ver estado del contenedor
docker ps

# Ver logs del contenedor
docker logs padelsys-notifications

# Verificar health check manualmente
curl http://localhost:8000/health
```

### Monitoreo
```bash
# Ver recursos utilizados
docker stats padelsys-notifications

# Ver logs en tiempo real
docker logs -f padelsys-notifications
```

## 📦 Características de la Imagen de Producción

✅ **Optimizaciones implementadas:**
- Multi-stage build (reduce tamaño ~60%)
- Solo dependencias de producción
- Código TypeScript compilado y minificado
- Usuario no-root para seguridad
- Health checks incluidos
- Logs estructurados
- Límites de recursos configurados

✅ **Lo que se elimina en producción:**
- Código fuente TypeScript (`src/`)
- DevDependencies (nodemon, ts-node, etc.)
- Source maps
- Archivos de desarrollo

## 🚨 Comandos de Mantenimiento

### Actualizar la aplicación
```bash
# 1. Detener el servicio actual
docker-compose -f docker-compose.prod.yml down

# 2. Actualizar código y rebuildar
git pull origin main
docker-compose -f docker-compose.prod.yml up --build -d
```

### Backup y rollback
```bash
# Crear tag de la imagen actual antes de actualizar
docker tag padelsys-notifications:latest padelsys-notifications:backup-$(date +%Y%m%d)

# Rollback en caso de problemas
docker stop padelsys-notifications
docker run -d --name padelsys-notifications -p 8000:3000 padelsys-notifications:backup-YYYYMMDD
```

### Limpiar recursos Docker
```bash
# Limpiar imágenes no utilizadas
docker image prune -f

# Limpiar todo el sistema Docker (cuidado!)
docker system prune -a
```

## 📊 Tamaño de la Imagen

- **Imagen de desarrollo**: ~1.2GB (incluye src, devDependencies, herramientas)
- **Imagen de producción**: ~150MB (solo runtime y código compilado)

## 🔧 Troubleshooting

### Problema: El contenedor no inicia
```bash
# Ver logs detallados
docker logs --details padelsys-notifications

# Ejecutar en modo interactivo para debuggear
docker run -it --rm padelsys-notifications:latest sh
```

### Problema: Variables de entorno no se cargan
```bash
# Verificar variables dentro del contenedor
docker exec padelsys-notifications env | grep NODE_ENV
```

### Problema: Puerto ocupado
```bash
# Ver qué proceso usa el puerto 8000
lsof -i :8000

# Cambiar puerto en docker-compose.prod.yml si es necesario
```

## 📈 Monitoreo y Logs

Los logs están configurados con rotación automática:
- Máximo 10MB por archivo
- Máximo 3 archivos rotativos
- Formato JSON estructurado

Para monitoreo avanzado, considera integrar:
- Prometheus + Grafana
- ELK Stack (Elasticsearch, Logstash, Kibana)
- New Relic o DataDog

---

**¡Listo!** Tu aplicación está optimizada para producción con código minificado y sin archivos TypeScript fuente.