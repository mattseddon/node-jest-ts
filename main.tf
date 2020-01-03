provider "aws" {
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  s3_force_path_style         = true
  access_key                  = "AKIA34SRAWDJ6A7H3Y7H"
  secret_key                  = "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"
  region                      = "us-east-1"
  endpoints {
    sns = "http://localhost:4575"
    sqs = "http://localhost:4576"
  }
}

resource "aws_sqs_queue" "local_queue" {
  name = "local-queue"
}

resource "aws_sns_topic" "local_topic" {
  name = "local-topic"
}

resource "aws_sns_topic_subscription" "local_sub" {
  topic_arn = aws_sns_topic.local_topic.arn
  endpoint  = aws_sqs_queue.local_queue.arn
  protocol  = "sqs"
}

