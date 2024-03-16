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

        url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/actions/workflows/{workflow_name}/dispatches"
        headers = {
        "Accept": "application/vnd.github+json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}",  # Add any headers you need
        "X-GitHub-Api-Version": "2022-11-28"
        }

        data = {"ref":"main"}


        requests.post(url, headers=headers, json=data)
        print("Your Workflow run has been triggered and is In Progress")

        
    else:
        print("Command failed.")
        print("Error message:")
        print(output.stderr)

elif file_location_query == "N" or file_location_query == "n":
    print("You will need a Dockerfile in your repo to make use of this script.")