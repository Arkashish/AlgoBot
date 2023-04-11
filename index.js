const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();
// console.log(process.env)
const bot = new Telegraf(process.env.BOT_TOKEN);

const binarySearchString = `
const binarySearch = function search(arr, x) {
    let lo = 0, hi = arr.length - 1;
    while(lo <= hi) {
        let mid = lo + Math.floor((hi - lo)/2);
        if(arr[mid] == x) return mid;
        else if(arr[mid] < x) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    return undefined;
}`;
const linuxCommands = `
    
    REPL
        REPL - READ EVALUATE PRINT LOOP
    Note:
        For any Linux command you can check the usage and different input flags it expects by running the command followed by --help
    
    Commands:
        pwd : this represents what is the current directory we are currently at.

        ls : you can print the content of the current directory we are in. All the files and sub-directories will be printed.
            ls -l : lists down more details about the file such as owner, permissions, date etc.
            ls -lh : works like ls -l but also gives the size of the files
            ls -a : also lists files and folders starting with .

        cd : this can help you to move into a folder and move out of a folder.
            cd .. : if you want to jump one folder back from the current directory.
            cd ../.. : if you want to make two jumps back from the current directory.    
            cd ~ : from any directory this will help you to come back to the home directory
            cd directory1/directory2/ : we can move into internal subdirectories directly by separating them with a forward slash / .

        Note:
            ~ -> this tilda refers to the home directory. Ex: /Users/arkashish .
            / -> this slash leads you to the root directory
            Relative path: It describes the location of a file/folder w.r.t current folder. Whereas in an absolute path, we mention the location from the home directory or root directory.
            When you give the absolute path of a file or folder that means you will give the whole path of that file or folder, whereas in the relative path you do jumps w.r.t to the current folder.
        
        clear : clears the working space by actually moving you to the top of the current shell.

        mkdir: this helps us to create a new folder
            
        touch <filename> : we can create a brand new blank file out of the blue.
            
        cat <filename> : prints the whole content of a file
            
        rm <filename> : this command deletes a file
            
        rmdir <foldername> : this command deletes an empty folder
            
        rm -r <foldername> : the -r flag enables rm to recursively delete all the content of the folder and then delete the folder
            
        ls | grep python : this will actually pass the output of ls as an input to grep, grep does a substring search of python on the output of ls
            
        ls > new.txt : whatever is the result of ls will be dumped into new.txt, nothing will be printed on the console. If new.txt has some content already then that will be replaced.
            
        ls >> new.txt : whatever is the result of ls will be dumped into new.txt, nothing will be printed on the console. If new.txt has some content already then the new content will be appended.
            
        <command 1> && <command 2>: this executes command1 followed by command 2 considering command1 has no errors.
            
        cp file1 file2 : copies the content of file1 to file2
            
        mv file1 file2: moves (cut paste) the file1 to a new position as file2. This can also help us to rename a file.
            
        tar -cf archive.zip 1.txt 2.txt : this command will add all the files mentioned after archive.zip into the zipped archive as mentioned.
            
        tar -zcf archive1.zip 1.txt 2.txt : this command will not only add the files to the zip but also compress them
            
        tar xf archive1.zip -C extract : all the content of archive1 will be extracted into the extracted folder.

`;

const vimCommands = `
    vim <filename> : this will create a file (if it doesn't exist) and then open it in the vim editor in the normal mode. In normal mode we can do changes to the file but we can read it and navigate it. You can also use vi <filename> to do the same thing.

    Now after opening vim if you want to start making changes you need to, first of all, make it change the mode from normal to insert mode. To go into the insert mode we can press i. If you want to come back to normal mode then press ESC.

    esc + :q -> if you want to exit a file we can do this.

    esc + :q! -> if file has some changes and we want to exit without saving changes

    esc + :wq -> if file has changes and we want to save it and then exit

    l : in normal mode, you can move the cursor right

    h : in normal mode, you can move the cursor left

    j : in normal mode, you can move the cursor down

    k : in normal mode, you can move the cursor up

    You can use normal right left up down arrow keys as well to navigate.

    dd : in normal mode, it will delete the line the cursor is currently at

    gg : in normal mode, it will make the cursor go on the first line

    G : in normal mode, it will make the cursor go on the last line

    w : in normal mode, it can make you jump one word

    2w : in normal mode, it will make you jump 2 words

    d2w : then this will delete 2 words

    :%s/foo/bar/ : to replace all occurrences of foo with bar

    yw : in normal mode, it copies one word

    yy : in normal mode, it copies a whole line

    p : for pasting in normal mode
`;

const help = `
        /binarysearch -> for binary search algo
    /toplinuxcommands -> for top linux commands easily used
    /linuxcommands -> all linux commands that are widely used
    /vimcommands -> all vim commands that are widely used
    /sticker -> You get a sticker back in reply
    /binarytreejs -> You get the binary tree code using js with the tree structure output
    /factorialcpp -> You get the factorial code for cpp

`;

try {
    bot.start((ctx) => ctx.reply('Welcome to Arkashish\'s Algo Bot')); // /start
       
    bot.command('help', (ctx) => ctx.reply(help));

    bot.command('binarysearch', (ctx) => ctx.reply(binarySearchString)); // /binarysearch
    
    bot.command('toplinuxcommands', (ctx) => ctx.reply('ls cd pwd grep rm'))
    
    bot.command('linuxcommands', (ctx) => ctx.reply(linuxCommands))
    
    bot.command('vimcommands', (ctx) => ctx.reply(vimCommands))

    bot.on('sticker', (ctx) => ctx.reply('❤️'));

    bot.command('binarytreejs', async (ctx) => {
        const response = await axios.get('https://raw.githubusercontent.com/singhsanket143/FrontendDSA/master/Aug_29/trees.js');
        ctx.reply(response.data);
    })

    
    bot.command('factorialcpp', async (ctx) => {
        const response = await axios.get('https://raw.githubusercontent.com/singhsanket143/CppDSA/master/DSA/2.%20Recursion/Part%201/factorial.cpp');
        ctx.reply(response.data);
    })
    bot.on('text', (ctx) => {
        console.log(ctx.update.message);
        if(ctx.update.message.text == 'I love you') {
            ctx.reply('love you too broo');
        }
        else if(ctx.update.message.text == 'hi') {
            ctx.reply('Hi welcome to AlgoBot. I\'m still a work in progress but I promise to improve.Plase send in your commands. You can use /help to know about what I offer as of now');
        } else {
            ctx.reply('i don\'t understand humans')
        }
    });

    bot.launch();
} catch {
    console.log("unexpected command");
}
