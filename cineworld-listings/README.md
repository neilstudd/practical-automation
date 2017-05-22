# Cineworld cinema listings watcher

See also: upcoming blog post!

## My problem

* On average I watch 2-3 films per week at Cineworld (thanks, Cineworld Unlimited card!)
* My local cinema is one of the smallest in the area, so I often have to look further afield if there's a particular film that I want to see.
* Cinemas are erratic at announcing showtimes for the next week: listings for Friday onwards will normally appear at some point on a Monday or Tuesday (unless it's a bank holiday Monday, in which case it's some point on a Tuesday or Wednesday).
* I have a preference for particular seats at certain cinemas (#firstworldproblems) so it's beneficial to book as early as possible.
* My life is too busy to be intermittently checking multiple pages on the Cineworld website to see if tickets have gone on-sale yet.

## My solution

* Javascript code to request the list of films at a particular cinema/date, and transforms the resulting JSON into a simple text list.
* Used Scriptr's scheduling service to run the script every 10 minutes until it spots that new listings are available.
* When listings are found, the details are sent via email, and the script then goes to sleep until the next week.

## How to use this script for yourself

1. Sign up for an account with [Scriptr](https://www.scriptr.io)
1. Paste the contents of `cineworld-listings.js` into a new Scriptr script
1. Locate the ID for the cinema that you wish to monitor. This will be a seven-digit number beginning with 101; you can locate the ID by looking at the source of the "Choose a cinema" dropdown on the Cineworld website.
1. Update the variables in lines 9-12 of the cineworld-listings script, to reflect the cinema you're interested in, and where you want to deliver the email.
1. On first execution, set `resetStartDate` to `true`, and update line 17 to set `storage.local.lastSuccess` to the next upcoming Friday.
1. Save the script, and run; the console will either indicate it's delivered an email, or tell you that the listings aren't available yet.
1. Set `resetStartDate` to false (the `lastSuccess` date will continue to update itself from now on)
1. Use Scriptr's "Schedule" menu to configure how frequently you want the script to run. For example: "Run every hour at 0, 15, 30, 45 minute(s) past the hour" will run the script every 15 minutes.

## Major iterations so far

1. Initial version simply picked Saturday (the day which usually has most films showing) and announced when it found listings on that day, allowing me to manually visit the Cineworld website to check the full listings for the week.
1. Refactored so that it iterates over every day in the upcoming week, compiling a complete list of upcoming films, and allowing me to spot films which are only showing on particular days.

## How I could improve the script in the future

* Display showtimes within the email (though this duplicates a feature which is already available through the Cineworld website)
* Link each film to its relevant page on the Cineworld website
* Filter-out films that I've already seen (sync with Letterboxd watched movies, or build own system for checking them off)
