terraform {
  backend "s3" {
    bucket = "rich-blog-state"
    key    = "tfstates/frontend"
    region = "eu-central-1"
  }
}

provider "aws" {
  region  = "eu-central-1"
}

resource "aws_s3_bucket" "rich_blog_bucket" {
  bucket = "rich-blog-frontend"

  tags = {
    Name = "rich-blog-frontend"
  }
}