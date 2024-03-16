import os
import subprocess
import requests

file_location_query = input("Do you have a Dokerfile available in your GitHub repo?(Yy/Nn): ")

def dockerfile_avail():
    file_location= input("Input full path to Dockerfile, if you are in the directory where the Dockerfile is, just input '.': ")
        # Construct the full path to the file
    file_path = os.path.join(file_location, "Dockerfile")
    
    

    # Check if the file exists
    if os.path.exists(file_path):
        print(f"The file 'Dockerfile' exists in the directory '{file_location}'.")
        return True
    else:
        print(f"The file 'Dockerfile' does not exist in the directory '{file_location}'.")


if file_location_query == "Y" or file_location_query == "y":

    files= []
    dirs= []

    git_repo= input("Please input your git repo with the '.git' extention at the end: ")

    command= f'git clone {git_repo}'

    # Split the URL by "/"
    parts = git_repo.split("/")

    # Get the second-to-last part
    repo_git = parts[-1]

    owner = parts[3]

    repo = repo_git.split(".")[0]


    print("In progress...")
    output = subprocess.run(command, shell=True, capture_output=True, text=True)

     # Check if the command was successful
    if output.returncode == 0:
    
        for entry in os.listdir("/home/abdulfrfr/Documents/CODES/capestone/"):
            full_path= os.path.join("/home/abdulfrfr/Documents/CODES/capestone/", entry)
        
            if os.path.isfile(entry):
                files.append(entry)
            elif os.path.isdir(full_path):
                dirs.append(full_path)
        
        for file in files:
            if file == "Dockerfile":
                print(file)

        for dir in dirs:
            for fold in os.listdir(dir):
                if fold == "Dockerfile":
                    print(fold)


        # Delete cloned folder after checking if 'Dockerfile(s) is/are available'
        command= f'rm -rf {repo}'

        subprocess.run(command, shell=True, capture_output=True, text=True)

        # Get github access key token
        token = input("Please input your GitHub access key token: ")

        print("workflow triggered!... In progress...")
        # Define your token and GitHub API version
        github_api_version = '2022-11-28'

        # Construct the URL
        get_workflow_id_url = f'https://api.github.com/repos/{owner}/{repo}/actions/workflows'

        # Define headers
        headers = {
            'Authorization': f'token {token}',
            'Accept': 'application/vnd.github.v3+json',
            'X-GitHub-Api-Version': github_api_version
        }

        # Make the GET request
        response = requests.get(get_workflow_id_url, headers=headers)

        # Print the response content
        workflow_id = response.json()['workflows'][0]['id']

        if workflow_id:
            workflow_dispatch_url = f'https://api.github.com/repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches'
            # Define headers
            headers = {
                'Authorization': f'token {token}',
                'Accept': 'application/vnd.github.v3+json',
                'X-GitHub-Api-Version': github_api_version
            }
            # Define request body
            payload = {'ref': 'main'}


            # Make the GET request
            response = requests.post(workflow_dispatch_url, headers=headers, json=payload)
            print(response.json())


        
    else:
        print("Command failed.")
        print("Error message:")
        print(output.stderr)




elif file_location_query == "N" or file_location_query == "n":
    print("You will need a Dockerfile in your repo to make use of this script.")