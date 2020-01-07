def load_words():
    with open('./../../words_alpha.txt') as word_file:
        valid_words = set(word_file.read().split())

    return valid_words


if __name__ == '__main__':
    english_words = load_words()
    # demo print
    string = 'INSERT INTO "words"(word)\nVALUES'
    str_end = ';'
    count = 0
    for word in english_words:
      string += f"('{word}'),\n"
      count +=1
    string = string[:-2] + str_end
    with open('database.sql', 'w') as file:
      file.write(string)
    print(count)