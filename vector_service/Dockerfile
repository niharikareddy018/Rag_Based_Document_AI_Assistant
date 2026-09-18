# Multi-stage Dockerfile for Spring Boot Java Vector Service using mvnd (Maven Daemon)
FROM eclipse-temurin:21-jdk-jammy AS builder
WORKDIR /build

# Install Apache Maven Daemon (mvnd) for high-speed daemonized builds
ARG MVND_VERSION=1.0.2
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates tar && \
    curl -fsSL https://archive.apache.org/dist/maven/mvnd/${MVND_VERSION}/maven-mvnd-${MVND_VERSION}-linux-amd64.tar.gz | tar -xz -C /opt && \
    ln -s /opt/maven-mvnd-${MVND_VERSION}-linux-amd64/bin/mvnd /usr/local/bin/mvnd && \
    rm -rf /var/lib/apt/lists/*

# Cache dependencies with mvnd
COPY pom.xml .
RUN mvnd dependency:go-offline -B || true

# Copy source code and build with mvnd
COPY src ./src
COPY ServiceConfig.json .
RUN mvnd clean package -DskipTests

# Runtime image
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

COPY --from=builder /build/target/*.jar app.jar
COPY ServiceConfig.json /app/ServiceConfig.json

RUN mkdir -p /app/file_vault

EXPOSE 8086

ENV SPRING_PROFILES_ACTIVE=prod
ENTRYPOINT ["java", "-jar", "app.jar"]
