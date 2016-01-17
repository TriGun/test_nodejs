#!/bin/sh
apt-get update -y
apt-get install -y git vim nginx redis-server ruby supervisor

#ssl credentials
echo setup ssl
mkdir -p /etc/ssl/pdffiller-crt/
mkdir -p /etc/ssl/pdffiller-key/

cp /vagrant/credentials/pdffiller.com-2016.crt /etc/ssl/pdffiller-crt/pdffiller.com-2016.crt
cp /vagrant/credentials/pdffiller-2012.key /etc/ssl/pdffiller-key/pdffiller-2012.key

#nginx
cp -R /vagrant/shell/config/nginx/ /etc/
service nginx reload

echo setup .bashrc
cp /vagrant/shell/.bashrc /home/vagrant/


echo Installing NodeJS and NPM

sudo apt-get update -y
sudo apt-get install -y npm

echo Installing n and node stable
sudo npm install -g n
sudo n stable
sudo npm install -g pm2

echo Installing and setuping resque web
cd /vagrant/node_modules/node-resque/resque-web
gem install bundler
bundle install
#bundle exec rackup

cp /vagrant/shell/config/supervisor/web_resque.conf /etc/supervisor/conf.d/
supervisorctl reread
supervisorctl update

[ -f /etc/hosts ] && echo "Found" || echo "Not found"