import os

dictionary_file = "words_alpha.txt"
lowercase_file = "lowercase_words.csv"
uppercase_file = "uppercase_words.csv"

os.remove(lowercase_file) if os.path.exists(lowercase_file) else None
os.remove(uppercase_file) if os.path.exists(uppercase_file) else None

valid_lowercase_characters = set (['a','b','d','e','g','o','p','q'])
valid_uppercase_characters = set (['A','B','D','O','P','Q','R'])

def is_valid_word(word, valid_characters):    
     word = ''.join([c for c in word if c not in valid_characters])
     return (len(word.strip()) == 0)

def save_to_file(word, filename):
     with open(filename, "a") as file:
          word = word.rstrip("\n")
          file.write(word + "," + str(len(word)) + "\n")

with open(dictionary_file, "r") as dictionary:
     for word in dictionary:
          if is_valid_word(word, valid_lowercase_characters): save_to_file(word, lowercase_file)
          if is_valid_word(word.upper(), valid_uppercase_characters): save_to_file(word.upper(), uppercase_file)