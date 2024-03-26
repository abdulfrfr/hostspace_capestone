```CAPESTONE PROJECT DOCUMENTATION```

``PRE-REQUISITES``

[x] Kubernetes Cluster
[x] Helm CLI
[x] Kubeseal CLI
[x] Pyhton3
[x] SealedSecret Insatalled on Cluster

The applications on this project consists of a React frontend, ExpressJS Backend application and a MongoDB Database.

Inside my `backend` and `frontend` directories are files and folders which carries my application's source code and Dockerfiles to build images out of these source codes. In my root directory, i have a file named `script.py` which clones my git repo which this file is been pushed to, search for it Dockerfiles for their availability and also trigger a github action build process to build my applications images and push them to my dockerhub.

On this Project i have created a Kubernestes Cluster on EKS using terraform, the files for it can be found in the `/terraform_eks` directory. using the `terraform init` command to initialize terraform and then the `terraform apply` to deploy my resources.

Following this, i then installed Karpenter, to enable my cluster carry every other resources that would be deployed on it.

Then i moved on to Install SealedSecret on my cluster using helm. The command for for the installation of SealedSecret can be found in the `/capestone-chart/kubeseal.sh` file. Following that, our MongoDB Database need authentication details including a USERNAME and a PASSWORD which will also be passed down into our Backend appication for authentication. Inside the `capestone-chart` directory, there is a file called `secret-script.py` which is a python script that helps us to automate the generation and deployment of sealed secrets. I will run the python sript to generate and deploy my sealed secret using the name which i have used inside my application's manifest.