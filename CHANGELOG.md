# Changelog

## 0.0.8 (7 April 2021)

### Fixes
1. Ensure *.kql & *.csl files are detected as kusto files.

### Enhancements

1. Support for Application Insights
1. Better handling of session timeout errors.
1. Improvements to adding connections (Clusters & AppInsights)
1. Added language capabilities for plain text kusto files (*.kql, *.csl)

## 0.0.7 (7 April 2021)
### Enhancements

1. Support for Application Insights
1. Better handling of session timeout errors.
1. Improvements to adding connections (Clusters & AppInsights)
1. Added language capabilities for plain text kusto files (*.kql, *.csl)

## 0.0.6 (4 April 2021)
### Enhancements

1. Optionally save output in the notebook. Defaults to `false`.
1. Create notebooks from the `Kusto` view in Database & Table nodes.
1. Ability to delete connections.

## 0.0.5 (1 April 2021)
### Enhancements

1. Support for language features in Kusto Notebooks (refactor, code completion, formatting, etc)
1. Support for language features in Jupyter Notebooks when using [kqlmagic](https://pypi.org/project/Kqlmagic/)
1. Kust panel, with access to clusters, databases & related information.
1. Improved getting started experience for Notebooks (configuring cluster/database).

## 0.0.2 (30 March 2021)
### Enhancements

1. Better data table viewer
1. Support for time series and scatter charts.
1. Support for viewing nested json.
1. Improved authentication (using VS Code's built-in authentication)
1. Using a custom notebook file (no longer using `*.ipynb`, now using `*.knb`)
1. Storing cluster and database information in the notebook metadata.


## 0.0.1 (29 March 2021)
Initial release

### Thanks

Thanks to the various projects we provide integrations with which help
make this extension useful:

-   [plotly](https://github.com/plotly/plotly.js)
