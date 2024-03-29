## inout
Кваліфікатор доступу аргументів. Задає можливість як читати так і змінювати аргумент. Нове значення змінної буде також доступне й за межами функції де відбулася ця зміна.

### Приклад
```glsl
void increment(inout int x) {
    x = x + 1;
}

void main() {
    int count = 1;

    increment(count);
    
    // тепер count == 2, оскільки змінна була передана у функцію із inout кваліфікатором та була оновлена
}
```

### Опис
**```inout```** — кваліфікатор доступу аргументів, який дозволяє як читати так і змінювати позначену змінну. Зміна значення застосується не лише всередині функції, але і поза її межами, як показано у прикладі.

### Дивіться також
[in](/glossary/?lan=ua&search=in), [out](/glossary/?lan=ua&search=out)
