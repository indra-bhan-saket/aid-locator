FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY backend/target/*.jar app.jar

RUN apk add --no-cache --allow-untrusted wget || echo "wget already available"

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]