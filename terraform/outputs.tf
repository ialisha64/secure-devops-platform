output "instance_id" {
  description = "EC2 Instance ID"
  value       = aws_instance.devops_server.id
}

output "elastic_ip" {
  description = "Elastic IP address"
  value       = aws_eip.devops_eip.public_ip
}

output "ami_id_used" {
  description = "AMI ID used (fetched dynamically)"
  value       = data.aws_ami.ubuntu.id
}

output "ami_name" {
  description = "AMI name"
  value       = data.aws_ami.ubuntu.name
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "ssh_command" {
  description = "SSH command to connect"
  value       = "ssh -i ${var.key_name}.pem ubuntu@${aws_eip.devops_eip.public_ip}"
}
