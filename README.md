# NLW Unite - DevOps

Trilha DevOps da 15ª edição do evento Next Level Week (NLW) produzido pela Rocketseat que ocorreu entre os dias 01 a 04 de abril de 2024, ministrado por [Daniel Rodrigues](https://github.com/eusouodaniel). Com o projeto foi possível conteinerizar e deployar uma API Node.js utilizando CI/CD num cluster Kubernetes local e utilizar os conceitos de IAC com Terraform para setup da dependência do banco de dados em nuvem na Supabase.

## Projetos base

https://github.com/rocketseat-education/nlw-unite-nodejs

https://github.com/rocketseat-education/nlw-unite-devops

- Obs: Na trilha, o setup do banco de dados foi realizado na DigitalOcean, porém por questões de familiaridade de projetos anteriores, achei mais simples realizar na Supabase, por isso a diferença.

## Tecnologias utilizadas

- Docker
- Docker Hub: container registry
- kubectl: interface para utilizar os recursos de um cluster já existente
- k3d: execução de um cluster k3s no docker
- Helm: package manager para o Kubernets
- Argo CD: ferramenta GitOps CD para o Kubernets
- GitHub Actions: pipeline CI/CD. Como última etapa trigga o deploy automatizado do Argo CD
- Terraform

## Principais comandos

### Terraform

- terraform init
- terraform fmt
- terraform plan
- terraform apply -auto-approve

### Kubernets

Cluster:
- k3d cluster create nlw-unite --servers 2
- k3d cluster delete --all

Gerenciamento:
- kubectl get nodes
- kubectl get pods // listagem de todos os pods
- kubectl get pods -n nlw // todos os pods de um namespace específico
- kubectl get ns // namespaces
- kubectl create ns test
- kubectl apply -f k8s/deployment.yaml -n test
- kubectl get deployments -n test
- kubectl get replicaset -n test
- kubectl delete pod _pod_name_ -n test
- kubectl port-forward pod/_pod_name_ -n test _host_port_:_container_port_
- kubectl get service -n test
- kubectl port-forward svc/_service_name_ -n test _host_port_:_container_port_
- kubectl logs _pod_name_ -n test
- kubectl top pods -n test
- kubectl top nodes

### Helm

- helm create deploy
- kubectl create ns nlw-helm
- helm upgrade --set _env_name_=_$ENV_NAME_ --install passin ./deploy -n nlw-helm
	* Obs: Em vez de colocar informações sensíveis nos arquivos yaml como tokens de acesso, senhas e urls de conexão ao banco de dados, é possível utilizar a opção --set para sobrescrever parâmetros do values.yaml a patir de uma variável de ambiente, por exemplo, antes da instalação de fato.

- helm list -n nlw-helm

### Argo CD

- kubectl create namespace argocd
- kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
- kubectl get svc -n argocd
- kubectl port-forward svc/argocd-server -n argocd 3001:80 // acesso a interface do Argo
- kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d // obter senha de acesso para login na interface do Argo.
	* Obs: Também é possível consultar esses secrets a partir da interface do Lens
- kubectl apply -n argocd -f apps/passin // criar manifesto no Kubernets dentro do namespace do Argo CD
- kubectl create namespace nlw // namespace utilizado no deploy declarativo utilizando o Argo CD
