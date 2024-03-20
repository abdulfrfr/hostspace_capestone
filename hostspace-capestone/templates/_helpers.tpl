# labels for frontend deployment and service
{{- define "frontend.labels" }}
app: frontend-app
{{ end -}}


# labels for backend deployment and service
{{- define "backend.labels" }}
app: backend-app
{{ end -}}


# labels for database deployment and service
{{- define "db.labels" }}
app: db-app
{{ end -}}