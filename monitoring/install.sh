#!/bin/bash

# install prometheus from helm
helm repo add prometheus-app https://prometheus-community.github.io/helm-charts
helm install prometheus prometheus-app/prometheus

# exposing the promethues service
kubectl patch svc prometheus -p '{"spec": {"type": "LoadBalancer"}}'


# install grafana from helm
helm repo add grafana-app https://grafana.github.io/helm-charts 
helm install grafana grafana-app/grafana

# exposing grafana service
kubectl patch svc grafana -p '{"spec": {"type": "LoadBalancer"}}'

# get grafana login details
kubectl get secret --namespace default grafana -o jsonpath="{.data.admin-password}" | ForEach-Object { [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($_)) }


