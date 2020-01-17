source "https://rubygems.org"

gem "minimal-mistakes-jekyll"
gem "github-pages", group: :jekyll_plugins


group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
end

install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

gem "jekyll-remote-theme"
gem 'jekyll-include-cache'

gem "faraday", "< 1.0"

