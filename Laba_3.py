import re

symbols = ['!', ';', ':', ',', '.', '?']


# line[i] in symbols \
# or line[i].isupper() \
# or bool(re.search('[a-zA-Z]', line[i])):

def main(file_name):
    file_text = open(file_name, "r")
    lines = file_text.readlines()

    bit_arrays = []
    index_array = 0

    for line in lines:
        bit_arrays.append([])
        for i in range(len(line)):
            if bool(re.search('[a-zA-Z]', line[i])):
                bit_arrays[index_array].append(1)
            else:
                bit_arrays[index_array].append(0)
        index_array += 1

    print(bit_arrays)

    lines_yes = []
    lines_no = []
    index_str = 0
    for bits in bit_arrays:
        result = 0
        for bit in bits:
            result = result | bit
        # if bit_arrays.length()%2 == 0:
        if len(bits)%2 == 0 | result == 1 :
            print("Строка №" + str(index_str + 1) + ": ДА : " + lines[index_str])
            lines_yes.append(lines[index_str])
        else:
            print("Строка №" + str(index_str + 1) + ": НЕТ : " + lines[index_str])
            lines_no.append(lines[index_str])
        index_str += 1
        # else:
        #     continue
    print("\nСтроки со скрытой информацией:\n")
    for line in lines_yes:
        print(line[:-1])

    print("\nСтроки без скрытой информации:\n")
    for line in lines_no:
        print(line[:-1])

    print("\n")

if __name__ == '__main__':
    print("Метод 'Числовые коды символов'")
    print("Все строки ДА:")
    main("laba3_1.txt")

    # print("Все строки НЕТ:")
    # main("laba3_2.txt")

    # print("Через одну:")
    # main("laba3_3.txt")