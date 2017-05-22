# Cineworld Unlimited Preview announcement listener

See also: upcoming blog post!

![Example output](http://i.imgur.com/iiU4BXJ.png)

## My problem

* Cineworld's Unlimited scheme includes semi-regular exclusive preview screenings of upcoming films.
* Cineworld will often add these "Unlimited Preview" listings to their website a long time before they announce the screening on email or social media.
* My local cinema is quite small, so (particularly in the case of 3D screenings) it's important to book early to get a good seat.
* Previously I was manually checking the list of films on the Cineworld website every few days, to see if any new Unlimited Previews were listed.

## My solution

* Javascript code which requests Cineworld's complete list of films, and looks for any which refer to "Unlimited" in the title.
* If an Unlimited Preview is found, the script checks to see if it's one that it already knows about; if so, the script ignores it.
* If it's a new film, the details are sent via email, and the script adds it to the list that it now knows about.

## How to use this script for yourself

1. Sign up for an account with [Scriptr](https://www.scriptr.io)
1. Paste the contents of `cineworld-unlimited.js` into a new Scriptr script
1. Modify the email address on line 29 to reflect where you'd like to send the email.
1. Save the script, and run; an email will be sent immediately for any already-announced screenings.
1. Optionally, run the script again; you'll see that it says "No new screenings found" and then lists the screenings that it already knows about.
1. Use Scriptr's "Schedule" menu to configure how frequently you want the script to run. For example: "Run every hour".
