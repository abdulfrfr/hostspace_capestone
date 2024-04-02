```CAPESTONE PROJECT DOCUMENTATION```

``PRE-REQUISITES``

[x] Kubernetes Cluster
[x] Helm CLI
[x] Kubeseal CLI
[x] Pyhton3
[x] SealedSecret Insatalled on Cluster

The applications on this project consists of a React frontend, ExpressJS Backend application and a MongoDB Database.

Inside my `backend` and `frontend` directories are files and folders which carries my application's source code and Dockerfiles to build images out of these source codes. In my root directory, i have a file named `script.py` which clones my git repo, search for it Dockerfiles for their availability and also trigger a github action build process to build my applications images and push them to my dockerhub. you can run the command to run the script `python3 script.py` and follow prompts.

I have created a Kubernestes Cluster on EKS using terraform, the files for it can be found in the `terraform_eks` directory. using the `terraform init` command to initialize terraform and then the `terraform apply` to deploy my resources.

Use ArgoCD in deploying our application to our cluster. inside the `argocd` directory, we have the `install.sh` file which will help us install argocd to our cluster and port-forward the argocd cd service to help us access our argocd dashboard, we also have the `application.yaml` file which is the argocd manifest to create an application on argocd to help us deploy our application to our cluster.

For exposing our cluster we utilize Nginx Ingress Controller. first we need to install the custom resources for our nginx controller, in the `ingress-controler` directory we will find the `crds.yaml` file will contains manifests to install the custom resources required, run the `kubectl apply` command to apply the resources to our cluster, follwing that we will install nginx ingress controller using helm from the `ingress-controller/install.sh` file which carries the command for the installation, then we run the `kubectl apply` command to install our ingress manifest to help expose our application using the `ingress-controller/ingress.yaml` file. 

Following this, Karpenter has been installed, to manage workload on the cluster. you can find the commands to install karpenter on the cluster in the `karpenter/install.sh` file, and also insall the NodePool resource in the `karpenter/nodepool.yaml` file.

Install SealedSecret on my cluster using helm, command for for the installation of SealedSecret can be found in the `/capestone-chart/kubeseal.sh` file. Following that, our MongoDB Database need authentication details including a USERNAME and a PASSWORD which will also be passed down into our Backend appication for authentication. Inside the `capestone-chart` directory, there is a file called `secret-script.py` which is a python script that helps us to automate the generation and deployment of sealed secrets. Run the python sript with `python3 secret-script.py` to generate and deploy a sealed secret using the name which i have used inside my application's manifest.

Prometheus and Grafana will be use in monitoring this application, installing commands for installing prometheus and grafana can be found in the `monitoring/install.sh` file, which will also expose our prometheus and grafana ports for us and also return login details for our grafana dashboard.