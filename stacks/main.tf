terraform {
  backend "s3" {
    bucket = "rich-blog-state"
    key    = "tfstates/frontend"
    region = "eu-central-1"
  }
}

provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "rich_blog_fe_bucket" {
  bucket = "rich-blog-frontend"

  tags = {
    Name = "rich-blog-frontend"
  }
}

resource "aws_s3_bucket_website_configuration" "rich_blog_fe_website" {
  bucket = aws_s3_bucket.rich_blog_fe_bucket.bucket

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_s3_bucket" "rich_blog_be_bucket" {
  bucket = "rich-blog-services"

  tags = {
    Name = "rich-blog-services"
  }
}

resource "aws_s3_object" "rich_blog_be" {
  bucket = aws_s3_bucket.rich_blog_be_bucket.id
  key    = "services.zip"
  source = "./artifacts/services.zip"
  etag   = filemd5("./artifacts/services.zip")
}

data "aws_iam_policy_document" "rich_blog_be_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["elasticbeanstalk.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "rich_blog_role" {
  name               = "rich_blog_role"
  assume_role_policy = data.aws_iam_policy_document.rich_blog_be_role_policy.json
}

resource "aws_elastic_beanstalk_application" "rich_blog_be_app" {
  name        = "rich-blog-be"
  description = "Rich Blog BE"

  appversion_lifecycle {
    delete_source_from_s3 = true
    max_count             = 1
    service_role          = aws_iam_role.rich_blog_role.arn
  }
}

resource "aws_elastic_beanstalk_application_version" "rich_blog_be_version" {
  name        = "rich-blog-be-v1"
  application = aws_elastic_beanstalk_application.rich_blog_be_app.name
  description = "application version created by terraform"
  bucket      = aws_s3_bucket.rich_blog_be_bucket.id
  key         = aws_s3_object.rich_blog_be.id
}

data "aws_elastic_beanstalk_solution_stack" "node_stack" {
  most_recent = true
  name_regex  = "^64bit Amazon Linux (.*) Node.js (.*)$"
}

resource "aws_vpc" "rich_blog_vpc" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "rich_blog_subnet" {
  vpc_id     = aws_vpc.rich_blog_vpc.id
  cidr_block = "10.0.1.0/24"

  tags = {
    Name = "Rich Blog Subnet"
  }
}

resource "aws_launch_configuration" "rich_blog_be_conf" {
  name_prefix   = "rich-blog-be-conf"
  image_id      = "ami-0ceb85bb30095410b"
  instance_type = "t2.nano"

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_elastic_beanstalk_environment" "rich_blog_be_env" {
  name                = "rich-blog-be-env"
  application         = aws_elastic_beanstalk_application.rich_blog_be_app.name
  solution_stack_name = data.aws_elastic_beanstalk_solution_stack.node_stack.name

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = aws_vpc.rich_blog_vpc.id
  }
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = aws_launch_configuration.rich_blog_be_conf.iam_instance_profile
  }
  setting {
    namespace = "aws:ec2:vpc"
    name      = "AssociatePublicIpAddress"
    value     = "True"
  }
  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = aws_subnet.rich_blog_subnet.id
  }
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "LoadBalancerType"
    value     = "application"
  }
  setting {
    namespace = "aws:ec2:vpc"
    name      = "ELBScheme"
    value     = "internet facing"
  }
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = 1
  }
  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = 2
  }
  setting {
    namespace = "aws:elasticbeanstalk:healthreporting:system"
    name      = "SystemType"
    value     = "enhanced"
  }
}
