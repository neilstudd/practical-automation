# Cineworld Unlimited Preview early-warning klaxon

## My problem

* Cineworld's Unlimited scheme includes semi-regular exclusive preview screenings of upcoming films.
* Cineworld will often reserve the dates for these screenings weeks before the tickets actually go on sale.
* I want to be able to reserve the date for such screenings even if I haven't been able to buy tickets yet.
* I have a secret mission to beat the [Unlimited Screening Klaxon](https://twitter.com/search?q=unlimited%20screening%20klaxon) guy on Twitter.

## My solution

* Javascript code which uses Cineworld's search engine to look for films containing the name "unlimited".
* If an Unlimited Preview is found, the script checks to see if it's one that it already knows about; if so, the script ignores it.
* If it's a new film, the details are sent via email, and the script adds it to the list that it now knows about.

## How to use this script for yourself

1. Sign up for an account with [Scriptr](https://www.scriptr.io)
1. Paste the contents of `unlimited-klaxon.js` into a new Scriptr script
1. Modify the email address on line 35 to reflect where you'd like to send the email.
1. Save the script, and run; an email will be sent immediately for any already-announced screenings.
1. Optionally, run the script again; you'll see that it says "No new screenings found" and then lists the screenings that it already knows about.
1. Use Scriptr's "Schedule" menu to configure how frequently you want the script to run. For example: "Run every hour".
