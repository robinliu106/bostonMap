# CS 591 Project 2 jyaang_robinliu106

Info:

We will accumulate various metrics on certain characteristics of all the neighborhoods in Boston to calculate a score that measures child-friendliness. We believe that these five characteristics determine child-friendliness: education, safety, parks and recreation, and amenities. To characterize the quality of education in each neighborhood, we will be utilizing data sets on test scores. To measure safety in each neighborhood, we will analyze data sets on local sex offenders and crime incidence reports. As for parks and recreation, we will be using recreational swimming pool and day camp data sets. Lastly, we are looking for data sets on amenities such as nearby hospitals and food inspections. For each neighborhood, we will be computing a score for each characteristic, and taking those scores into consideration all of these scores, we will compute a total score from 1-100.  We intend to make the weight of each factor vary depending on priority. Our working weights that we have now are: 30% education, 30% safety, 25% amenities, and 15% parks/recreation.


In this project, we are no longer limiting the scores to each neighborhood, but rather a more specific point in Boston. We will be taking the geographic points using an interactive interface where users can pick any point in Boston, and per point we will calculate its distance from the nearest hospitals, schools, and recreational facilities. Based on these distances, we will be developing a scoring mechanism to calculate a score that we will visually present on a map of Boston. Higher rated points will be concentrated in certain areas, more clearly and accurately conveying which areas are more “child-friendly.”


Instructions:

1. clone repo to computer, enter project folder

2. Enter commands in Terminal (Unix):

    "npm install"

    "node app.js"

3. In your Browser, go to "localhost:8000" to view page.
