source "https://rubygems.org"

gem "minimal-mistakes-jekyll"
gem "github-pages", group: :jekyll_plugins


group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.12"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-paginate"
  gem "jekyll-include-cache"
  gem "jekyll-algolia"
  gem "jemoji"
  gem "jekyll-gist"
  gem "jekyll-redirect-from"
  gem "kramdown", ">= 2.3.1"
end

install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?

gem "jekyll-remote-theme"
gem "faraday", "< 1.0"
gem "activesupport", ">= 6.0.3.1"