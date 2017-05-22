'Title:         JIRA QuickJump Script
'Date:          2011-2017
'Description:   Allows the user to instantly jump to a known JIRA ID, or perform a
'               search within JIRA, without first needing to open JIRA in a webpage.
'               YMMV but this is a massive productivity boost for me!

'Examples:      | Value Entered		    | Result
'		        |-----------------------|----------------------------------		
'               | 12345                 | Opens MV-12345 in a webpage.
'		        | mv12345		        | Opens MV-12345 in a webpage.
'		        | MV-12345		        | Opens MV-12345 in a webpage.
'		        | ptfs sync      	    | Performs a fuzzy search (i.e. ptfs OR sync)
'		        | "ptfs sync"	        | Performs a phrase search (i.e. search for "ptfs sync")


'Define the base path of the JIRA installation. 
urlStem = "https://moveitmoveit.atlassian.net/"

Set WshShell = WScript.CreateObject("WScript.Shell")
Set objHTML = WScript.CreateObject("htmlfile")

'InputBox for jumping.
searchQuery = InputBox("Examples:" & vbCrLf & vbCrLf & "123, mv123 or mv-123: Jump to MV-123" & vbCrLf & "ptfs sync: Fuzzy search for ptfs sync" & vbCrLf & """ptfs sync"": Phrase search for ptfs sync","JIRA QuickJump")

'Read the user's input and best-guess what they meant to do, in the following order:
'-------------------------------------------------------------------------------
'Case #1: If it begins with MV-, do a literal search
If UCase(Left(searchQuery,3))="MV-" or UCase(Left(searchQuery,4))="SOL-" Then
 jumpURL = urlStem & "browse/" & UCase(searchQuery)
'-------------------------------------------------------------------------------
'Case #2: If it begins with MV -> MV-<blah>.
ElseIf UCase(Left(searchQuery,2))="MV" Then
 jumpURL = urlStem & "browse/MV-" & Mid(searchQuery,3)
'-------------------------------------------------------------------------------
'Case #3: If it begins with a number, give it the benefit of the doubt by assuming it to be a MV-.
ElseIf IsNumeric(Left(searchQuery,1)) Then
 jumpURL = urlStem & "browse/MV-" & searchQuery
'-------------------------------------------------------------------------------
'Case #4 (The Else Case): User knows best, they must've meant to do a search for this term.
ElseIf searchQuery<>"" Then
 searchQuery = Replace(searchQuery," ","%20")
 searchQuery = Replace(searchQuery,"""","\%22")
 jumpURL = urlStem & "secure/IssueNavigator.jspa?reset=true&jqlQuery=summary+~+%22" & searchQuery & "%22+OR+description+~+%22" & searchQuery & "%22+OR+comment+~+%22" & searchQuery & "%22"
End If
'-------------------------------------------------------------------------------

'Open webpage if we found a webpage worth opening.
If jumpURL<>"" Then
 Return = WshShell.Run("chrome.exe " & jumpURL, 1) 
End If