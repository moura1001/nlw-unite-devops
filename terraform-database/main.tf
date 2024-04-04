resource "supabase_project" "db-name" {
  organization_id   = var.organization_id
  name              = "nlw-unite-devops"
  database_password = var.database_password
  region            = "sa-east-1"
}