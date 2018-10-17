# Running microservices securely with Docker on AWS’s ECS

## Setup your local envirnoment credentials.

The project requires a `DB_URL` variable to connecto to the DB Instance. On local environments the `DB_URL` var will be provided by docker-compose.
Using the `AUTHOR` we'll store metadata each time the service starts.

```
DB_URL=
AUTHOR=
```

## Development

To run the server on your local environment just:

`./up.sh`

## AWS CLI Configuration

To upload your image, you need a "nodeconf" profile to be set up. Make sure your `~/.aws/credentials` file has a section that looks like this:

```
[nodeconfg]
aws_access_key_id=<your-access-key-id>
aws_secret_access_key=<your-secret-access-key>
```

and your `~/.aws/config` file has a section that looks like this (notice the "profile"):

```
[profile nodeconf]
region = us-west-1
```

If you have both files correctly configured and you are still getting an error, make sure your token is valid by running:

```
export AWS_DEFAULT_PROFILE=nodeconf
aws iam get-user
```

## Deployment

Ensure you have installed the latest version of the AWS CLI and Docker. For more information, see the ECR documentation.
1) Retrieve the login command to use to authenticate your Docker client to your registry.
For macOS or Linux systems, use the AWS CLI:

    `$(aws ecr get-login --no-include-email --region us-east-1)`

For Windows systems, use AWS Tools for PowerShell:
Invoke-Expression -Command (Get-ECRLoginCommand -Region us-east-1).Command

Note: If you receive an "Unknown options: --no-include-email" error when using the AWS CLI, ensure that you have the latest version installed. Learn more

2) If you are using the AWS CLI, run the login command from the output of step 1.

3) Build your Docker image using the following command. For information on building a Docker file from scratch see the instructions here. You can skip this step if your image is already built:

    `docker build -t nodeconf-server .`

4) After the build completes, tag your image so you can push the image to this repository:

    `docker tag nodeconf-server:latest 398398166530.dkr.ecr.us-east-1.amazonaws.com/nodeconf-server:1.0.0`

5) Run the following command to push this image to your newly created AWS repository:

    `docker push 398398166530.dkr.ecr.us-east-1.amazonaws.com/nodeconf-server:1.0.0`
   
### Valores a usar en el workshop   

#### Si tu usuario es "x", tus links y nombres a usar son:
- Usuario x
- AWS console login: https://kelsusinc.signin.aws.amazon.com/console
- AWS user: nodeconfx
- AWS pass: kelsus@nodeconf2018
- Target group: nodeconf-server-usuariox
- Log group: nodeconf-server/usuariox
- Task definition: nodeconf-server-usuariox
- Container name: nodeconf-server-container-usuariox
- Environment variables:
    - DB_URL=postgres://kelsus:kelsus123@grupo-n.c87dwxbbq8mu.us-west-1.rds.amazonaws.com/nodeconf
    - AUTHOR=tu-nombre
- Service: nodeconf-server-service-usuariox

#### Si tu grupo es "n", tus links y nombres a usar son:
- Grupo n
- DB Identifier: grupo-n
- DB Endpoint: grupo-n.cr3njupv44fo.us-east-1.rds.amazonaws.com
- Load Balancer: nodeconf-grupo-n
- Cluster: grupo-n

### Para consultas una vez finalizado el workshop:
https://prodockertraining.com/contacto-desarrollador/


