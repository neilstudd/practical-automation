# JIRA QuickJump

![Screenshot](http://i.imgur.com/dnGEbEu.png)

## My problem

* Many times a day I find myself opening JIRA, clicking into the search field, and searching for an issue.
* Some companies that I've worked for have multiple JIRA repositories, or multiple separate projects.

## My solution

* VBScript (eurgh, I know) providing a simple alert box, performing manipulation based on the input, and opening a browser page.

## How to use this script for yourself

1. Put the attached VBScript file into an appropriate location on your computer.
1. Review/rewrite the If/ElseIf statements to fit your own needs (can be as straightforward or as complex as you like; the current version in the repo is quite simple, but I've had much more complex versions in the past!)
1. Create a shortcut to the VBScript file (this is important, as Windows will allow you to set a keyboard shortcut on a .lnk, but not directly on a .vbs file).
1. Open the Windows Properties dialog for the shortcut file, and assign an appropriate keyboard shortcut.
1. Now whenever you hit that keyboard shortcut, your QuickJump alert box should open.
