#!/usr/bin/env bash
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::configure("2") do |config|

 config.vm.provider :virtualbox do |vb|
    vb.customize [
      "modifyvm", :id,
      "--memory", "1024",
      "--cpus", "4",
      "--ioapic", "on",
      "--natdnshostresolver1", "on",
      "--natdnsproxy1", "on"
      ]
    end

  config.vm.box = "ubuntu/trusty64"

  config.vm.hostname = "message.manager.pdffiller"
  config.vm.network :forwarded_port, guest: 3306, host: 3306, auto_correct: true

  # Assign this VM to a host-only network IP, allowing you to access it
  # via the IP. Host-only networks can talk to the host machine as well as
  # any other machines on the same network, but cannot be accessed (through this
  # network interface) by any external networks.

  config.vm.network :private_network, ip: "192.168.33.50"

  config.vm.provision :shell, path: "shell/start.sh"

end