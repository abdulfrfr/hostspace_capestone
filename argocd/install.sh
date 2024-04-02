#!/bin/bash


# create namespace and install argocd
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml


# patch service into a load-balancer
kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer"}}'

# or port-forward for access
kubectl port-forward svc/argocd-server -n argocd 8080:443