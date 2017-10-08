# Dictionary Searches

## My problem

What's the longest word that can be written using only the top row of keys on the keyboard? Popular wisdom says that the answer is TYPEWRITER, but I wanted a way to confirm whether this was true, and to find other lesser-known words which might be of similar length.

## My solution

* Python script which takes a list of dictionary words, and compares each word to a set of reference characters.
* If a word consists only of the specified characters, it is exported to an appropriately-named CSV file, which can then be manipulated to find the longest words in the set.

So, now I can see that although TYPEWRITER is 10 letters long, there are a cluster of (seemingly mostly US) words that are 11 characters in length: 

```
proprietory	11
proterotype	11
rupturewort	11
pepperroot	10
peppertree	10
pepperwort	10
peripteroi	10
perpetuity	10
perruquier	10
pewterwort	10
pirouetter	10
pirquetter	10
prerequire	10
pretorture	10
proprietor	10
repertoire	10
repetiteur	10
repetitory	10
tetterwort	10
typewriter	10
```

## How to use this script for yourself

1. Ensure you are running Python 3.x or higher.
1. Run this script! It will take longer on first run, as it will download the default list of words.
1. After execution, your directory will now include a dictionary text file, plus a CSV file for each of the exported searches.
1. Edit the script and extend it to include your own lists of word curiosities!

## How I could improve the script in the future

* Find a more precise/definable word list - some sort of OED export, for example.
* Reduce duplication by having some sort of object/array structure to store all the search terms, and then iterate over them.
