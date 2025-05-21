FROM php:8.2-apache

WORKDIR /var/www/html

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Enable mod_rewrite
RUN a2enmod rewrite

# Copy Apache virtual host
COPY vhost.conf /etc/apache2/sites-available/000-default.conf

# Copy Laravel app
COPY . /var/www/html

# Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Install Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug
