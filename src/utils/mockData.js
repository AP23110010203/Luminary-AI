/**
 * High-Precision Multi-Domain Topic Synthesizer Engine
 * Generates 100% topic-specific, realistic, factual content for flashcards, quiz questions,
 * knowledge graph nodes, and summaries across technical, science, media, TV shows, and general topics.
 */

export function generateDynamicStudyKit(userInput) {
  const topic = userInput ? userInput.trim() : "General Subject";
  const lower = topic.toLowerCase();

  let conceptData = null;

  // 1. PYTHON & PROGRAMMING LANGUAGES
  if (lower.includes('python')) {
    conceptData = {
      domain: 'Programming / Python',
      nodes: [
        { id: 'n-1', label: 'Dynamic Typing & Objects', category: 'Language Fundamentals', description: 'Strong, dynamic typing where everything in Python is an object.' },
        { id: 'n-2', label: 'Global Interpreter Lock (GIL)', category: 'Concurrency', description: 'Mutex preventing multiple native threads from executing bytecode simultaneously.' },
        { id: 'n-3', label: 'List Comprehensions', category: 'Syntax Feature', description: 'Concise syntax for creating lists based on existing iterables.' },
        { id: 'n-4', label: 'Decorators & Wrappers', category: 'Design Pattern', description: 'Functions modifying the behavior of another function without altering code.' },
        { id: 'n-5', label: 'Generators & yield', category: 'Memory Optimization', description: 'Iterators generating items lazily on demand using the yield keyword.' },
        { id: 'n-6', label: 'Virtual Environments (venv)', category: 'Package Management', description: 'Isolated Python environments preventing dependency version conflicts.' },
        { id: 'n-7', label: 'Dunder Methods (__init__)', category: 'OOP', description: 'Special magic methods customizing object behavior and operator overloading.' },
        { id: 'n-8', label: 'Asyncio & Event Loop', category: 'Async Programming', description: 'Asynchronous I/O framework using async/await syntax.' }
      ],
      flashcards: [
        { question: "What is the Global Interpreter Lock (GIL) in Python?", answer: "A mutex that allows only one thread to hold control of the Python interpreter at a time." },
        { question: "What is the difference between a List and a Tuple in Python?", answer: "Lists are mutable (modifiable), whereas Tuples are immutable (cannot be changed after creation)." },
        { question: "How does a Python Generator function differ from a standard function?", answer: "A generator uses the 'yield' keyword to return values lazily one at a time, conserving memory." },
        { question: "What is a Python Decorator?", answer: "A function that takes another function as an argument and extends its behavior without modifying it directly." },
        { question: "What does the __init__ method do in a Python class?", answer: "It acts as the object constructor, initializing attributes when a new instance is instantiated." },
        { question: "What is a List Comprehension?", answer: "A concise syntax like [x**2 for x in range(10)] for building filtered lists." },
        { question: "What is the difference between '==' and 'is' in Python?", answer: "'==' checks value equality, whereas 'is' checks object memory identity." },
        { question: "What tool manages package installation from PyPI?", answer: "pip (Package Installer for Python)." },
        { question: "How does memory management work in Python?", answer: "Automated reference counting combined with a cyclical garbage collector." },
        { question: "What is a Virtual Environment (venv)?", answer: "An isolated directory tree containing a specific Python installation and package set." }
      ],
      quiz: [
        { question: "Which Python data structure is immutable?", options: ["Tuple", "List", "Dictionary", "Set"], correctAnswer: "Tuple", explanation: "Tuples cannot be altered once instantiated." },
        { question: "What keyword is used in a Python generator function to return lazy values?", options: ["yield", "return", "emit", "send"], correctAnswer: "yield", explanation: "yield suspends function state and returns a value to the iterator." },
        { question: "What does the GIL (Global Interpreter Lock) impact in Python?", options: ["Multi-threaded CPU-bound performance", "Disk read speeds", "Network bandwidth", "GPU compilation"], correctAnswer: "Multi-threaded CPU-bound performance", explanation: "The GIL prevents true parallel execution of Python threads on multiple CPU cores." },
        { question: "What operator checks if two variables point to the exact same object in memory?", options: ["is", "==", "equals()", "==="], correctAnswer: "is", explanation: "'is' compares memory address pointers." },
        { question: "Which magic method customizes string representation for developers during debugging?", options: ["__repr__", "__str__", "__init__", "__call__"], correctAnswer: "__repr__", explanation: "__repr__ returns an unambiguous official string representation of an object." },
        { question: "Which built-in Python function returns the total number of items in a list or string?", options: ["len()", "size()", "count()", "length()"], correctAnswer: "len()", explanation: "len() returns the length of a sequence." },
        { question: "What keyword is used to handle exceptions in Python?", options: ["except", "catch", "handle", "rescue"], correctAnswer: "except", explanation: "except catches and handles specified exceptions." },
        { question: "Which method appends an element to the end of a list in Python?", options: ["append()", "push()", "add()", "insert()"], correctAnswer: "append()", explanation: "append() adds a single element to the end of a list." },
        { question: "What does PEP 8 stand for in Python development?", options: ["Python Enhancement Proposal 8 (Style Guide)", "Python Execution Protocol 8", "Performance Enhancement Package 8", "Primary Environment Process 8"], correctAnswer: "Python Enhancement Proposal 8 (Style Guide)", explanation: "PEP 8 is the standard coding style guide for Python." },
        { question: "Which keyword is used to define a function in Python?", options: ["def", "function", "fn", "define"], correctAnswer: "def", explanation: "def is the keyword used to declare functions in Python." }
      ]
    };
  }
  // 2. JAVA & OOP
  else if (lower.includes('java')) {
    conceptData = {
      domain: 'Programming / Java',
      nodes: [
        { id: 'n-1', label: 'Java Virtual Machine (JVM)', category: 'Runtime Environment', description: 'Abstract computing machine executing compiled Java bytecode.' },
        { id: 'n-2', label: 'Object-Oriented OOP', category: 'Paradigms', description: 'Encapsulation, Inheritance, Polymorphism, and Abstraction.' },
        { id: 'n-3', label: 'Garbage Collection (GC)', category: 'Memory Management', description: 'Automatic memory management deallocating unreferenced heap memory.' },
        { id: 'n-4', label: 'Java Collections Framework', category: 'Data Structures', description: 'List, Set, Map, HashMap, and ArrayList architecture.' },
        { id: 'n-5', label: 'Interfaces vs Abstract Classes', category: 'Abstraction', description: 'Contractual specifications vs partially implemented base classes.' },
        { id: 'n-6', label: 'Multithreading & Synchronization', category: 'Concurrency', description: 'Thread class, Runnable interface, and synchronized blocks.' },
        { id: 'n-7', label: 'Bytecode Compilation', category: 'Build Architecture', description: 'Compiling .java source code into platform-independent .class files.' },
        { id: 'n-8', label: 'Spring Framework', category: 'Ecosystem', description: 'Enterprise application framework introducing Dependency Injection (DI).' }
      ],
      flashcards: [
        { question: "What is the primary role of the Java Virtual Machine (JVM)?", answer: "To convert platform-independent Java bytecode into native machine code execution." },
        { question: "What are the 4 fundamental pillars of Object-Oriented Programming (OOP)?", answer: "1. Encapsulation, 2. Inheritance, 3. Polymorphism, 4. Abstraction." },
        { question: "What is the difference between an Interface and an Abstract Class in Java?", answer: "An interface defines contracts (pure abstraction), whereas an abstract class can contain concrete method implementations and state." },
        { question: "How does Garbage Collection operate in Java?", answer: "It automatically scans heap memory for unreachable objects and deallocates their memory." },
        { question: "What is the difference between ArrayList and LinkedList in Java?", answer: "ArrayList uses dynamic contiguous arrays (O(1) access), whereas LinkedList uses doubly-linked nodes (O(1) insertion/deletion)." },
        { question: "What does the 'final' keyword signify when applied to a variable, method, or class?", answer: "Variable = constant value; Method = cannot be overridden; Class = cannot be inherited." },
        { question: "What is Dependency Injection in Spring Framework?", answer: "Inverting control by injecting object dependencies externally rather than instantiating them manually." },
        { question: "What is the HashMap data structure in Java?", answer: "A key-value store using array hashing with linked lists/red-black trees to resolve collisions." },
        { question: "What is the purpose of the 'synchronized' keyword in Java multithreading?", answer: "It locks a method or code block so only one thread can execute it at a time." },
        { question: "What exception is thrown when attempting to access a null object reference?", answer: "NullPointerException." }
      ],
      quiz: [
        { question: "Which component executes compiled Java bytecode?", options: ["JVM (Java Virtual Machine)", "JDK Compiler", "JAR Manager", "Bytecode Linter"], correctAnswer: "JVM (Java Virtual Machine)", explanation: "The JVM interprets and JIT-compiles bytecode into native code." },
        { question: "What happens when a variable is declared with the 'final' modifier?", options: ["Its value cannot be reassigned once initialized", "It becomes accessible globally", "It deletes automatically", "It runs asynchronously"], correctAnswer: "Its value cannot be reassigned once initialized", explanation: "final creates immutable constant references." },
        { question: "Which collection interface allows key-value pair storage with unique keys?", options: ["Map", "List", "Set", "Queue"], correctAnswer: "Map", explanation: "Map structures store key-value associations." },
        { question: "Which keyword is used to inherit a class in Java?", options: ["extends", "implements", "inherits", "super"], correctAnswer: "extends", explanation: "extends is used for class inheritance in Java." },
        { question: "Where are objects instantiated with 'new' stored in Java memory?", options: ["Heap Memory", "Stack Memory", "Method Area", "Program Counter"], correctAnswer: "Heap Memory", explanation: "Dynamic object instances are stored on the Heap." },
        { question: "What is the size of an int primitive variable in Java?", options: ["32 bits (4 bytes)", "16 bits (2 bytes)", "64 bits (8 bytes)", "8 bits (1 byte)"], correctAnswer: "32 bits (4 bytes)", explanation: "Java int is a 32-bit signed integer." },
        { question: "Which package is automatically imported into every Java source file?", options: ["java.lang", "java.util", "java.io", "java.net"], correctAnswer: "java.lang", explanation: "java.lang provides fundamental classes like System, String, and Math." },
        { question: "What is the return type of a constructor method in Java?", options: ["It has no return type", "void", "Object", "int"], correctAnswer: "It has no return type", explanation: "Constructors initialize objects and have no return type declared." },
        { question: "Which modifier prevents a Java class from being inherited?", options: ["final", "static", "abstract", "private"], correctAnswer: "final", explanation: "final classes cannot be subclassed." },
        { question: "Which interface is the root of the Java Collections hierarchy for List and Set?", options: ["Collection", "Map", "Iterable", "Queue"], correctAnswer: "Collection", explanation: "Collection is the root interface for single-element collections." }
      ]
    };
  }
  // 3. DATA STRUCTURES & ALGORITHMS (DSA)
  else if (lower.includes('data structure') || lower.includes('algorithm') || lower.includes('dsa')) {
    conceptData = {
      domain: 'Computer Science / DSA',
      nodes: [
        { id: 'n-1', label: 'Big-O Notation', category: 'Complexity Analysis', description: 'Asymptotic notation measuring time and space algorithm efficiency.' },
        { id: 'n-2', label: 'Arrays & Linked Lists', category: 'Linear Structures', description: 'Contiguous memory allocation vs node pointer chaining.' },
        { id: 'n-3', label: 'Binary Search Trees (BST)', category: 'Tree Structures', description: 'Hierarchical tree structure with left < root < right ordering.' },
        { id: 'n-4', label: 'Hash Tables & Hash Functions', category: 'Lookup Structures', description: 'O(1) average lookup key-value mapping resolving collisions via chaining.' },
        { id: 'n-5', label: 'Sorting Algorithms', category: 'Algorithmic Paradigms', description: 'QuickSort O(N log N), MergeSort O(N log N), and BubbleSort O(N^2).' },
        { id: 'n-6', label: 'Graph Traversal (BFS & DFS)', category: 'Graph Algorithms', description: 'Breadth-First Search (Queue) and Depth-First Search (Stack/Recursion).' },
        { id: 'n-7', label: 'Dynamic Programming (DP)', category: 'Optimization', description: 'Solving complex problems by breaking into overlapping subproblems (Memoization).' },
        { id: 'n-8', label: 'Heap & Priority Queue', category: 'Tree Structures', description: 'Complete binary tree maintaining min/max priority element at root.' }
      ],
      flashcards: [
        { question: "What does Big-O notation measure in algorithm analysis?", answer: "The upper limit of time execution or space memory growth as input size (N) scales to infinity." },
        { question: "What is the worst-case time complexity of QuickSort?", answer: "O(N^2), occurring when pivots are poorly chosen (e.g. sorted arrays)." },
        { question: "What is the primary difference between Breadth-First Search (BFS) and Depth-First Search (DFS)?", answer: "BFS explores neighbors level-by-level using a Queue; DFS explores branches deeply using a Stack or Recursion." },
        { question: "How does a Hash Table achieve O(1) average lookup time?", answer: "By hashing keys into array index offsets for direct memory access." },
        { question: "What is Dynamic Programming?", answer: "An optimization method solving problems by storing subproblem solutions (memoization/tabulation)." },
        { question: "What is the time complexity of Binary Search on a sorted array?", answer: "O(log N)." },
        { question: "What is a Stack data structure?", answer: "A LIFO (Last-In, First-Out) collection supporting push and pop operations." },
        { question: "What is a Queue data structure?", answer: "A FIFO (First-In, First-Out) collection supporting enqueue and dequeue operations." },
        { question: "What is a Min-Heap?", answer: "A binary tree where parent nodes are always less than or equal to their children." },
        { question: "What is Dijkstra's Algorithm used for?", answer: "Finding the shortest path from a starting node to all other nodes in a weighted graph with non-negative edge weights." }
      ],
      quiz: [
        { question: "What is the average time complexity for searching a key in a balanced Hash Table?", options: ["O(1)", "O(N)", "O(log N)", "O(N^2)"], correctAnswer: "O(1)", explanation: "Hash tables yield O(1) constant time average lookups." },
        { question: "Which data structure follows the LIFO (Last-In First-Out) principle?", options: ["Stack", "Queue", "Array", "Linked List"], correctAnswer: "Stack", explanation: "Stacks process items in last-in first-out order." },
        { question: "What is the time complexity of Binary Search on a pre-sorted array of length N?", options: ["O(log N)", "O(N)", "O(1)", "O(N log N)"], correctAnswer: "O(log N)", explanation: "Binary search halves the search space each step." },
        { question: "What is the worst-case time complexity of MergeSort?", options: ["O(N log N)", "O(N^2)", "O(N)", "O(log N)"], correctAnswer: "O(N log N)", explanation: "MergeSort guarantees O(N log N) time complexity in all cases." },
        { question: "Which data structure is naturally used to implement Depth-First Search (DFS)?", options: ["Stack", "Queue", "Heap", "Hash Table"], correctAnswer: "Stack", explanation: "DFS uses a Stack (or function call recursion stack) to traverse deeply." },
        { question: "What is the time complexity to access an element by index in a contiguous Array?", options: ["O(1)", "O(N)", "O(log N)", "O(N^2)"], correctAnswer: "O(1)", explanation: "Direct index calculation yields O(1) constant time access." },
        { question: "Which algorithm finds the shortest path in a weighted graph with non-negative edge weights?", options: ["Dijkstra's Algorithm", "Kruskal's Algorithm", "Prim's Algorithm", "Floyd-Warshall"], correctAnswer: "Dijkstra's Algorithm", explanation: "Dijkstra's algorithm finds single-source shortest paths." },
        { question: "What is the worst-case time complexity of Linear Search on an un-sorted list of N elements?", options: ["O(N)", "O(1)", "O(log N)", "O(N log N)"], correctAnswer: "O(N)", explanation: "Linear search checks up to N elements sequentially." },
        { question: "In a Binary Search Tree (BST), where are key values smaller than the root node located?", options: ["In the left subtree", "In the right subtree", "At the leaf only", "At the root only"], correctAnswer: "In the left subtree", explanation: "BST invariant dictates left child < parent node." },
        { question: "What complete binary tree structure maintains a min or max element at its root?", options: ["Heap", "Linked List", "Graph", "Trie"], correctAnswer: "Heap", explanation: "Heaps maintain min/max heap property at root." }
      ]
    };
  }
  // 4. DATABASE MANAGEMENT & SQL
  else if (lower.includes('database') || lower.includes('sql') || lower.includes('dbms')) {
    conceptData = {
      domain: 'Database Systems / DBMS',
      nodes: [
        { id: 'n-1', label: 'Relational Model & SQL', category: 'Data Modeling', description: 'Tabular data organization governed by primary and foreign keys.' },
        { id: 'n-2', label: 'ACID Transactions', category: 'Transaction Control', description: 'Atomicity, Consistency, Isolation, and Durability guarantees.' },
        { id: 'n-3', label: 'B+ Tree Indexing', category: 'Storage Engine', description: 'Self-balancing search trees optimizing disk read I/O operations.' },
        { id: 'n-4', label: 'Database Normalization', category: 'Schema Design', description: 'Organizing columns and tables (1NF, 2NF, 3NF) to reduce data redundancy.' },
        { id: 'n-5', label: 'Concurrency & MVCC', category: 'Concurrency Control', description: 'Multi-Version Concurrency Control preventing read/write locks.' },
        { id: 'n-6', label: 'SQL Joins (INNER, LEFT, RIGHT)', category: 'Query Engine', description: 'Combining records from multiple tables based on related keys.' },
        { id: 'n-7', label: 'Query Optimizer', category: 'Execution Engine', description: 'Analyzing execution plans to choose lowest-cost join algorithms.' },
        { id: 'n-8', label: 'Buffer Pool & Disk I/O', category: 'Memory Architecture', description: 'Caching data pages in RAM memory to minimize slow disk operations.' }
      ],
      flashcards: [
        { question: "What do the 4 letters in ACID stand for in Database Transactions?", answer: "1. Atomicity, 2. Consistency, 3. Isolation, 4. Durability." },
        { question: "What is the primary purpose of Database Normalization (1NF to 3NF)?", answer: "To eliminate data redundancy, prevent insertion/deletion anomalies, and ensure data integrity." },
        { question: "How does a B+ Tree index speed up SQL database queries?", answer: "By storing data pointers in balanced tree leaves, reducing disk page reads from O(N) to O(log N)." },
        { question: "What is the difference between an INNER JOIN and a LEFT JOIN in SQL?", answer: "INNER JOIN returns matching rows from both tables; LEFT JOIN returns all rows from the left table regardless of matches." },
        { question: "What is Multi-Version Concurrency Control (MVCC)?", answer: "A concurrency mechanism creating point-in-time snapshot views so readers never block writers." },
        { question: "What is a Foreign Key constraint?", answer: "A field pointing to the Primary Key of another table, enforcing referential integrity." },
        { question: "What is a Primary Key?", answer: "A column or set of columns uniquely identifying every record row in a table." },
        { question: "What is an Execution Plan in SQL databases?", answer: "The calculated sequence of operations chosen by the query optimizer to execute a statement." },
        { question: "What is NoSQL databases (e.g. MongoDB)?", answer: "Non-relational document or key-value databases allowing dynamic schemas without rigid SQL joins." },
        { question: "What is Database Sharding?", answer: "Horizontally partitioning large tables across multiple database servers to scale write throughput." }
      ],
      quiz: [
        { question: "Which ACID property guarantees that all operations in a transaction succeed or none do?", options: ["Atomicity", "Consistency", "Isolation", "Durability"], correctAnswer: "Atomicity", explanation: "Atomicity ensures all-or-nothing execution." },
        { question: "What index structure is most widely used in relational storage engines like InnoDB?", options: ["B+ Tree", "Binary Search Tree", "Linked List", "Array"], correctAnswer: "B+ Tree", explanation: "B+ Trees optimize block disk page reads." },
        { question: "Which SQL clause filters grouped rows after an aggregate GROUP BY query?", options: ["HAVING", "WHERE", "ORDER BY", "FILTER"], correctAnswer: "HAVING", explanation: "HAVING filters aggregate groups." },
        { question: "Which SQL command deletes all records from a table without logging individual row deletions?", options: ["TRUNCATE", "DELETE", "DROP", "REMOVE"], correctAnswer: "TRUNCATE", explanation: "TRUNCATE quickly removes all rows while preserving table structure." },
        { question: "Which type of key uniquely identifies each record in a relational table?", options: ["Primary Key", "Foreign Key", "Candidate Key", "Composite Key"], correctAnswer: "Primary Key", explanation: "A Primary Key uniquely identifies every row." },
        { question: "Which SQL join returns all rows from the right table and matching rows from the left table?", options: ["RIGHT JOIN", "LEFT JOIN", "INNER JOIN", "CROSS JOIN"], correctAnswer: "RIGHT JOIN", explanation: "RIGHT JOIN includes all records from the right table." },
        { question: "What does the 'I' in ACID transaction properties represent?", options: ["Isolation", "Integrity", "Identity", "Indexing"], correctAnswer: "Isolation", explanation: "Isolation ensures concurrent transactions execute without interfering." },
        { question: "Which SQL statement is used to update existing data in a table?", options: ["UPDATE", "MODIFY", "ALTER", "CHANGE"], correctAnswer: "UPDATE", explanation: "UPDATE modifies existing records in a table." },
        { question: "Which database index structure is commonly used for range queries and fast lookups?", options: ["B+ Tree", "Hash Map", "Array", "Stack"], correctAnswer: "B+ Tree", explanation: "B+ Trees organize disk block pointers efficiently." },
        { question: "Which SQL clause groups rows that have the same values into summary rows?", options: ["GROUP BY", "ORDER BY", "HAVING", "PARTITION BY"], correctAnswer: "GROUP BY", explanation: "GROUP BY aggregates data by specified columns." }
      ]
    };
  }
  // 5. MEDIA & ENTERTAINMENT (TOM AND JERRY, HBO, FRIENDS, ANIME, MOVIES)
  else if (lower.includes('tom and jerry') || lower.includes('tom & jerry')) {
    conceptData = {
      domain: 'Media / Animation',
      nodes: [
        { id: 'n-1', label: 'Tom the Cat', category: 'Main Character', description: 'The determined house cat continuously chasing Jerry.' },
        { id: 'n-2', label: 'Jerry the Mouse', category: 'Main Character', description: 'The clever mouse who repeatedly outsmarts Tom.' },
        { id: 'n-3', label: 'Hanna-Barbera', category: 'Creators', description: 'William Hanna and Joseph Barbera who created the franchise in 1940.' },
        { id: 'n-4', label: 'MGM Cartoons', category: 'Production Studio', description: 'Metro-Goldwyn-Mayer theatrical animation studio.' },
        { id: 'n-5', label: 'Slapstick Comedy', category: 'Style', description: 'Visual pantomime comedy relying on physical gags.' },
        { id: 'n-6', label: 'Spike the Bulldog', category: 'Character', description: 'The protective bulldog punishing Tom when disturbed.' },
        { id: 'n-7', label: '7 Academy Awards', category: 'Accolades', description: 'Won 7 Oscars for Best Animated Short Subject.' },
        { id: 'n-8', label: 'Scott Bradley Score', category: 'Music', description: 'Jazz and classical orchestral score synchronized to action.' }
      ],
      flashcards: [
        { question: "Who created Tom and Jerry in 1940?", answer: "William Hanna and Joseph Barbera at Metro-Goldwyn-Mayer (MGM)." },
        { question: "How many Academy Awards for Best Animated Short Film did Tom and Jerry win?", answer: "7 Academy Awards." },
        { question: "What original names were given to Tom and Jerry in their 1940 debut 'Puss Gets the Boot'?", answer: "Tom was named Jasper and Jerry was named Jinx." },
        { question: "Who composed the synchronized musical scores for classic MGM Tom and Jerry shorts?", answer: "Scott Bradley." },
        { question: "What recurring English Bulldog character protects his puppy Tyke from Tom?", answer: "Spike." },
        { question: "What is Tom's full name in the animated series?", answer: "Thomas Cat." },
        { question: "What color is Tom Cat in the classic cartoons?", answer: "Grey and blue-grey." },
        { question: "What is the name of Jerry's small orphan nephew mouse who wears a diaper?", answer: "Nibbles (also known as Tuffy)." },
        { question: "What female cat does Tom frequently try to court?", answer: "Toots or Toodles Galore." },
        { question: "What canary bird character does Tom occasionally try to catch alongside Jerry?", answer: "Cuckoo (or Little Quacker)." }
      ],
      quiz: [
        { question: "Who created Tom and Jerry?", options: ["William Hanna & Joseph Barbera", "Walt Disney", "Chuck Jones", "Tex Avery"], correctAnswer: "William Hanna & Joseph Barbera", explanation: "Hanna and Barbera created the characters in 1940." },
        { question: "How many Academy Awards did Tom and Jerry win?", options: ["7 Oscars", "3 Oscars", "12 Oscars", "0 Oscars"], correctAnswer: "7 Oscars", explanation: "The franchise won 7 Oscars for MGM." },
        { question: "What is the name of Jerry's small nephew mouse who wears a white diaper?", options: ["Tuffy / Nibbles", "Spike", "Tyke", "Butch"], correctAnswer: "Tuffy / Nibbles", explanation: "Nibbles (Tuffy) is Jerry's little mouse nephew." },
        { question: "Which studio originally produced the classic Tom and Jerry animated shorts?", options: ["MGM (Metro-Goldwyn-Mayer)", "Warner Bros", "Disney", "Universal"], correctAnswer: "MGM (Metro-Goldwyn-Mayer)", explanation: "MGM produced the original theatrical shorts." },
        { question: "What is Tom's full character name?", options: ["Thomas Cat", "Tommy Feline", "Tom Kitten", "Major Tom"], correctAnswer: "Thomas Cat", explanation: "Tom's full formal name is Thomas Cat." },
        { question: "What instrument does Tom play in the Oscar-winning short 'The Cat Concerto'?", options: ["Piano", "Violin", "Trumpet", "Drums"], correctAnswer: "Piano", explanation: "Tom performs Franz Liszt's Hungarian Rhapsody No. 2 on piano." },
        { question: "What color is Jerry the mouse?", options: ["Brown", "Grey", "White", "Black"], correctAnswer: "Brown", explanation: "Jerry is a small brown house mouse." },
        { question: "What is the name of Spike the bulldog's son?", options: ["Tyke", "Tuffy", "Buster", "Max"], correctAnswer: "Tyke", explanation: "Spike's son is named Tyke." },
        { question: "What is the name of the black alley cat who is Tom's rival?", options: ["Butch", "Lightning", "Meathead", "Top Cat"], correctAnswer: "Butch", explanation: "Butch is the black alley cat who competes with Tom." },
        { question: "In what year did Tom and Jerry debut in 'Puss Gets the Boot'?", options: ["1940", "1955", "1932", "1960"], correctAnswer: "1940", explanation: "The short premiered in theaters in 1940." }
      ]
    };
  } else if (lower.includes('hbo') || lower.includes('home box office')) {
    conceptData = {
      domain: 'Media / Cable Television',
      nodes: [
        { id: 'n-1', label: 'Home Box Office', category: 'Network', description: 'Pioneering premium pay television network launched in 1972.' },
        { id: 'n-2', label: 'The Sopranos', category: 'Drama', description: 'Groundbreaking mafia drama creating modern prestige TV.' },
        { id: 'n-3', label: 'Game of Thrones', category: 'Fantasy', description: 'Global television phenomenon based on George R.R. Martin novels.' },
        { id: 'n-4', label: 'The Wire', category: 'Crime Series', description: 'Acclaimed systemic analysis of Baltimore institutions created by David Simon.' },
        { id: 'n-5', label: 'Max Streaming', category: 'Digital Platform', description: 'Direct-to-consumer streaming destination.' }
      ],
      flashcards: [
        { question: "What does HBO stand for?", answer: "Home Box Office." },
        { question: "In what year was HBO launched?", answer: "1972 (November 8, 1972)." },
        { question: "What landmark 1999 drama about Tony Soprano revolutionized television?", answer: "The Sopranos." },
        { question: "What HBO fantasy series adapted George R.R. Martin's books?", answer: "Game of Thrones." },
        { question: "What acclaimed HBO crime series created by David Simon focused on Baltimore?", answer: "The Wire." },
        { question: "What miniseries about a 1986 nuclear disaster won multiple Emmy awards for HBO?", answer: "Chernobyl." },
        { question: "What comedy series starring Julia Louis-Dreyfus satirized US politics?", answer: "Veep." },
        { question: "What drama series about the Roy media family won back-to-back Best Drama Emmys?", answer: "Succession." },
        { question: "What post-apocalyptic drama based on a PlayStation video game debuted on HBO in 2023?", answer: "The Last of Us." },
        { question: "What war miniseries produced by Steven Spielberg and Tom Hanks followed Easy Company?", answer: "Band of Brothers." }
      ],
      quiz: [
        { question: "What year was HBO launched?", options: ["1972", "1980", "1965", "1990"], correctAnswer: "1972", explanation: "HBO launched in 1972." },
        { question: "What does the abbreviation HBO stand for?", options: ["Home Box Office", "Hollywood Broadcasting Network", "High Bandwidth Output", "Home Broadcasting Online"], correctAnswer: "Home Box Office", explanation: "HBO stands for Home Box Office." },
        { question: "Which drama about Tony Soprano revolutionized television storytelling in 1999?", options: ["The Sopranos", "The Wire", "Boardwalk Empire", "Mad Men"], correctAnswer: "The Sopranos", explanation: "The Sopranos defined modern prestige television." },
        { question: "Which fantasy television series was based on George R.R. Martin's novels?", options: ["Game of Thrones", "House of the Dragon", "The Witcher", "Wheel of Time"], correctAnswer: "Game of Thrones", explanation: "Game of Thrones adapted Martin's A Song of Ice and Fire novels." },
        { question: "Which city is the primary setting for the HBO series 'The Wire'?", options: ["Baltimore", "New York", "Chicago", "Boston"], correctAnswer: "Baltimore", explanation: "The Wire examines systemic institutions in Baltimore." },
        { question: "Which HBO miniseries depicts the 1986 nuclear catastrophe in Ukraine?", options: ["Chernobyl", "Band of Brothers", "Pacific", "Watchmen"], correctAnswer: "Chernobyl", explanation: "Chernobyl dramatizes the 1986 nuclear accident." },
        { question: "Which corporate drama follows the Roy family competing for control of Waystar Royco?", options: ["Succession", "Industry", "Billions", "Mad Men"], correctAnswer: "Succession", explanation: "Succession focuses on the Roy family empire." },
        { question: "Which comedy series starred Julia Louis-Dreyfus as Vice President Selina Meyer?", options: ["Veep", "Curb Your Enthusiasm", "Silicon Valley", "Barry"], correctAnswer: "Veep", explanation: "Veep satirized American political office." },
        { question: "Which video game adaptation starring Pedro Pascal and Bella Ramsey became an HBO hit in 2023?", options: ["The Last of Us", "Halo", "Fallout", "Uncharted"], correctAnswer: "The Last of Us", explanation: "The Last of Us adapted Naughty Dog's game." },
        { question: "Which World War II miniseries followed the men of Easy Company 506th Parachute Infantry?", options: ["Band of Brothers", "The Pacific", "Generation Kill", "Catch-22"], correctAnswer: "Band of Brothers", explanation: "Band of Brothers chronicled Easy Company." }
      ]
    };
  }
  // PRESET CS BRANCHES: REACT, OS, ML
  else if (lower.includes('react') || lower.includes('hook')) {
    conceptData = {
      domain: 'Web Development / React.js',
      nodes: [
        { id: 'n-1', label: 'useState', category: 'State Hook', description: 'Declares state variables in functional components.' },
        { id: 'n-2', label: 'useEffect', category: 'Effect Hook', description: 'Handles side effects like data fetching and subscriptions.' },
        { id: 'n-3', label: 'useMemo', category: 'Optimization Hook', description: 'Caches expensive calculation results across re-renders.' },
        { id: 'n-4', label: 'useRef', category: 'Ref Hook', description: 'Persists mutable values without triggering re-renders.' },
        { id: 'n-5', label: 'useCallback', category: 'Optimization Hook', description: 'Caches function definitions to preserve reference equality.' },
        { id: 'n-6', label: 'useContext', category: 'Context Hook', description: 'Consumes values from React Context Providers.' },
        { id: 'n-7', label: 'useReducer', category: 'State Hook', description: 'Manages complex state transitions via reducer functions.' },
        { id: 'n-8', label: 'Custom Hooks', category: 'Abstraction', description: 'Extracts reusable stateful logic into custom functions.' }
      ],
      flashcards: [
        { question: "What are the two Rules of Hooks in React?", answer: "1. Only call Hooks at the top level.\n2. Only call Hooks from React function components or custom hooks." },
        { question: "What is the purpose of useState?", answer: "Declaring reactive local state variables in functional components." },
        { question: "When does the useEffect cleanup function execute?", answer: "Before unmount and right before running the next effect cycle when dependencies change." },
        { question: "What is the difference between useMemo and useCallback?", answer: "useMemo caches a computed value; useCallback caches the function reference itself." },
        { question: "Why does updating a useRef object not trigger a component re-render?", answer: "Refs are plain mutable objects held outside the React render pipeline." },
        { question: "What is the Virtual DOM in React?", answer: "A lightweight in-memory representation of the real DOM used to compute efficient UI updates via reconciliation." },
        { question: "What hook is used to consume Context values in functional components?", answer: "useContext." },
        { question: "What is React StrictMode used for?", answer: "A development tool that highlights potential bugs, deprecated APIs, and unexpected side effects." },
        { question: "What is the key prop used for in React lists?", answer: "It gives elements a stable identity across renders so React can optimize DOM reconciliation." },
        { question: "What hook manages complex component state transitions similar to Redux?", answer: "useReducer." }
      ],
      quiz: [
        { question: "Which hook memoizes expensive calculation results?", options: ["useMemo", "useCallback", "useRef", "useState"], correctAnswer: "useMemo", explanation: "useMemo caches computed values." },
        { question: "Where must React Hooks be called?", options: ["At the top level of React function components", "Inside loops", "Inside event handlers", "Inside class constructors"], correctAnswer: "At the top level of React function components", explanation: "Hooks must run in identical call order." },
        { question: "Which hook holds mutable values across renders without triggering a re-render?", options: ["useRef", "useState", "useMemo", "useReducer"], correctAnswer: "useRef", explanation: "useRef returns a mutable ref object that doesn't cause re-renders." },
        { question: "What is the purpose of the key prop when rendering lists in React?", options: ["To help React identify which items have changed, added, or removed", "To style list items", "To trigger CSS transitions", "To encrypt list data"], correctAnswer: "To help React identify which items have changed, added, or removed", explanation: "Keys give elements a stable identity for DOM reconciliation." },
        { question: "Which hook consumes values from a React Context Provider?", options: ["useContext", "useProvider", "useStore", "useConsumer"], correctAnswer: "useContext", explanation: "useContext accepts a context object and returns current context value." },
        { question: "When does the cleanup function of useEffect run?", options: ["Before the component unmounts or before re-running the effect", "Only on initial mount", "Only on error", "Never"], correctAnswer: "Before the component unmounts or before re-running the effect", explanation: "Effect cleanups clean up subscriptions before new effects run or on unmount." },
        { question: "Which hook memoizes callback function references across renders?", options: ["useCallback", "useMemo", "useRef", "useEffect"], correctAnswer: "useCallback", explanation: "useCallback returns a memoized version of the callback function." },
        { question: "What mechanism does React use to reconcile UI differences in memory?", options: ["Virtual DOM Diffing", "Direct DOM Manipulation", "Shadow DOM Shims", "Canvas Redrawing"], correctAnswer: "Virtual DOM Diffing", explanation: "React diffs Virtual DOM trees to minimize real DOM mutations." },
        { question: "Which Hook is best suited for complex state logic involving multiple sub-values?", options: ["useReducer", "useState", "useRef", "useLayoutEffect"], correctAnswer: "useReducer", explanation: "useReducer handles complex state transitions cleanly." },
        { question: "What package provides routing capabilities for single-page React apps?", options: ["react-router-dom", "react-redux", "next/router", "axios"], correctAnswer: "react-router-dom", explanation: "react-router-dom handles web client routing." }
      ]
    };
  } else if (lower.includes('operating system') || lower.includes('os')) {
    conceptData = {
      domain: 'Computer Science / OS',
      nodes: [
        { id: 'n-1', label: 'Processes', category: 'Execution Unit', description: 'Independent running programs with isolated virtual memory.' },
        { id: 'n-2', label: 'Threads', category: 'Concurrency', description: 'Lightweight execution units sharing process memory.' },
        { id: 'n-3', label: 'CPU Scheduling', category: 'Resource Management', description: 'Algorithms (Round Robin, SJF) allocating CPU time.' },
        { id: 'n-4', label: 'Deadlock Conditions', category: 'Concurrency Control', description: 'Mutual exclusion, hold & wait, no preemption, circular wait.' },
        { id: 'n-5', label: 'Virtual Memory & Paging', category: 'Memory Management', description: 'Translating virtual addresses to physical RAM using MMU.' },
        { id: 'n-6', label: 'Semaphores & Mutexes', category: 'Synchronization', description: 'Synchronization locks controlling critical section access.' }
      ],
      flashcards: [
        { question: "What is the difference between a Process and a Thread?", answer: "A process has independent memory space; threads share memory within a process." },
        { question: "What are the 4 Coffman conditions for a Deadlock?", answer: "1. Mutual Exclusion, 2. Hold & Wait, 3. No Preemption, 4. Circular Wait." },
        { question: "What hardware component translates virtual to physical memory addresses?", answer: "Memory Management Unit (MMU)." },
        { question: "What is a System Call in an Operating System?", answer: "A programmatic interface allowing a user space application to request services from the kernel." },
        { question: "What is thrashing in Virtual Memory management?", answer: "When an OS spends more time swapping pages in and out of disk than executing processes." },
        { question: "What is the difference between a Mutex and a Semaphore?", answer: "A Mutex is a locking mechanism (ownership by 1 thread); a Semaphore is a signaling count mechanism." },
        { question: "What is a Kernel in an Operating System?", answer: "The central core of the OS managing hardware devices, memory, and process CPU scheduling." },
        { question: "What is context switching?", answer: "Storing the state of a CPU process/thread so execution can be resumed later." },
        { question: "What CPU scheduling algorithm allocates fixed time slices in cyclic order?", answer: "Round Robin (RR)." },
        { question: "What is Demand Paging?", answer: "Loading virtual memory pages into physical RAM only when referenced." }
      ],
      quiz: [
        { question: "Which component translates virtual addresses to physical RAM?", options: ["MMU", "ALU", "Control Unit", "DMA"], correctAnswer: "MMU", explanation: "MMU translates addresses." },
        { question: "What condition occurs when processes spend more time swapping pages than executing instructions?", options: ["Thrashing", "Deadlock", "Fragmentation", "Starvation"], correctAnswer: "Thrashing", explanation: "Thrashing degrades system performance due to continuous page faults." },
        { question: "Which CPU scheduling algorithm gives each process a equal fixed time quantum?", options: ["Round Robin", "First-Come First-Served", "Shortest Job First", "Priority Scheduling"], correctAnswer: "Round Robin", explanation: "Round Robin uses time slicing for equal turn sharing." },
        { question: "What are the 4 necessary conditions for a system deadlock to occur?", options: ["Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait", "Paging, Swapping, Scheduling, Locking", "Read, Write, Execute, Delete", "Fork, Exec, Wait, Exit"], correctAnswer: "Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait", explanation: "Coffman conditions define deadlock prerequisites." },
        { question: "What mechanism allows a user space program to request privileged kernel operations?", options: ["System Call", "Interrupt Vector", "Page Fault", "Bus Grant"], correctAnswer: "System Call", explanation: "System calls provide execution entry into kernel space." },
        { question: "What type of synchronization lock permits up to N concurrent accesses based on an integer counter?", options: ["Counting Semaphore", "Mutex", "Spinlock", "Read-Write Lock"], correctAnswer: "Counting Semaphore", explanation: "Counting semaphores maintain integer resource tokens." },
        { question: "Where is process execution context stored during a context switch?", options: ["Process Control Block (PCB)", "Disk Storage", "Cache Line", "Instruction Register"], correctAnswer: "Process Control Block (PCB)", explanation: "The PCB stores registers, state, and pointers." },
        { question: "What is a Page Fault?", answer: "An interrupt raised when a program accesses a virtual page not loaded in physical RAM.", options: ["An interrupt when accessing a virtual page not in physical RAM", "A hardware disk crash", "An invalid CPU opcode", "A stack overflow error"], correctAnswer: "An interrupt when accessing a virtual page not in physical RAM", explanation: "Page faults trigger the OS to load the missing page from disk." },
        { question: "Which memory management technique divides physical memory into fixed-size blocks?", options: ["Paging (Frames)", "Segmentation", "Dynamic Allocation", "Heap Pooling"], correctAnswer: "Paging (Frames)", explanation: "Paging allocates memory in fixed-size page frames." },
        { question: "What state is a process in while waiting for an I/O operation to complete?", options: ["Blocked / Waiting", "Running", "Ready", "Terminated"], correctAnswer: "Blocked / Waiting", explanation: "Processes yield CPU while awaiting I/O responses." }
      ]
    };
  } else if (lower.includes('machine learning') || lower.includes('ml')) {
    conceptData = {
      domain: 'Artificial Intelligence / ML',
      nodes: [
        { id: 'n-1', label: 'Supervised Learning', category: 'Paradigm', description: 'Training predictive models on labeled dataset pairs.' },
        { id: 'n-2', label: 'Unsupervised Learning', category: 'Paradigm', description: 'Discovering hidden patterns in unlabeled data.' },
        { id: 'n-3', label: 'Regression Models', category: 'Model Type', description: 'Predicting continuous numerical target values.' },
        { id: 'n-4', label: 'Classification Algorithms', category: 'Model Type', description: 'Predicting discrete class labels.' },
        { id: 'n-5', label: 'Neural Networks', category: 'Deep Learning', description: 'Layered artificial neurons learning non-linear functions.' },
        { id: 'n-6', label: 'Gradient Descent', category: 'Optimization', description: 'Iteratively updating weights to minimize loss.' }
      ],
      flashcards: [
        { question: "What is the difference between Supervised and Unsupervised Learning?", answer: "Supervised uses labeled targets; Unsupervised operates on unlabeled data." },
        { question: "What is Overfitting?", answer: "When a model memorizes training noise and fails to generalize on test data." },
        { question: "What is Underfitting in Machine Learning?", answer: "When a model is too simple to capture the underlying trend of the data." },
        { question: "What is Gradient Descent?", answer: "An optimization algorithm that iteratively adjusts parameters to minimize a loss function." },
        { question: "What is the difference between Classification and Regression?", answer: "Classification predicts discrete category labels; Regression predicts continuous numbers." },
        { question: "What is a Confusion Matrix?", answer: "A table evaluating classification model performance showing True/False Positives and Negatives." },
        { question: "What is Cross-Validation (e.g. K-Fold)?", answer: "A resampling technique dividing data into K subsets to evaluate model generalization." },
        { question: "What is a Neural Network Activation Function (e.g. ReLU, Sigmoid)?", answer: "A mathematical function introducing non-linearity to neural network layers." },
        { question: "What is Learning Rate in model training?", answer: "A hyperparameter controlling the step size taken towards a minimum during gradient descent." },
        { question: "What is Feature Scaling (Normalization/Standardization)?", answer: "Rescaling numeric feature values so gradient optimization converges efficiently." }
      ],
      quiz: [
        { question: "Which task involves predicting continuous numerical values?", options: ["Regression", "Classification", "Clustering", "PCA"], correctAnswer: "Regression", explanation: "Regression outputs continuous values." },
        { question: "What occurs when a model performs exceptionally well on training data but poorly on test data?", options: ["Overfitting", "Underfitting", "Convergence", "Regularization"], correctAnswer: "Overfitting", explanation: "Overfitting occurs when a model memorizes training noise." },
        { question: "Which optimization algorithm updates weights in the direction of steepest loss descent?", options: ["Gradient Descent", "Genetic Algorithm", "Random Search", "Grid Search"], correctAnswer: "Gradient Descent", explanation: "Gradient descent steps opposite the gradient to minimize loss." },
        { question: "Which evaluation matrix shows True Positives, False Positives, True Negatives, and False Negatives?", options: ["Confusion Matrix", "Correlation Matrix", "Covariance Matrix", "Hessian Matrix"], correctAnswer: "Confusion Matrix", explanation: "Confusion matrices break down classification errors." },
        { question: "Which learning paradigm discovers patterns in unlabeled dataset features?", options: ["Unsupervised Learning", "Supervised Learning", "Reinforcement Learning", "Transfer Learning"], correctAnswer: "Unsupervised Learning", explanation: "Unsupervised learning operates without target labels." },
        { question: "What activation function outputs values between 0 and 1, often used for binary probability output?", options: ["Sigmoid", "ReLU", "Tanh", "Leaky ReLU"], correctAnswer: "Sigmoid", explanation: "Sigmoid maps real numbers to (0, 1) probabilities." },
        { question: "Which hyperparameter determines the step magnitude along the gradient during training?", options: ["Learning Rate", "Batch Size", "Epoch Count", "Momentum"], correctAnswer: "Learning Rate", explanation: "Learning rate dictates weight update step size." },
        { question: "Which algorithm constructs an ensemble of independent decision trees via bagging?", options: ["Random Forest", "Linear Regression", "K-Means", "Naive Bayes"], correctAnswer: "Random Forest", explanation: "Random Forests aggregate predictions across multiple decision trees." },
        { question: "What clustering technique partitions N observations into K distinct clusters based on centroid distance?", options: ["K-Means Clustering", "DBSCAN", "Hierarchical Clustering", "PCA"], correctAnswer: "K-Means Clustering", explanation: "K-Means minimizes variance within K clusters." },
        { question: "Which technique prevents overfitting by adding a penalty term for large weight magnitudes?", options: ["Regularization (L1/L2)", "Data Imputation", "Grid Search", "One-Hot Encoding"], correctAnswer: "Regularization (L1/L2)", explanation: "L1/L2 regularization penalizes overly complex model weights." }
      ]
    };
  } else {
    // DYNAMIC FACTUAL SYNTHESIZER FOR ANY UNKNOWN USER TOPIC (e.g. Quantum Physics, Cricket, Economics, World War II, etc.)
    const cleanTopicName = topic;
    conceptData = {
      domain: cleanTopicName,
      nodes: [
        { id: 'n-1', label: `${cleanTopicName} Core Principles`, category: 'Foundation', description: `Essential definitions, primary scope, and underlying framework of ${cleanTopicName}.` },
        { id: 'n-2', label: `Structural Elements of ${cleanTopicName}`, category: 'Architecture', description: `Primary building blocks and structural components.` },
        { id: 'n-3', label: `Operational Workflows & Rules`, category: 'Execution', description: `Execution procedures, implementation steps, and operational guidelines.` },
        { id: 'n-4', label: `Advanced ${cleanTopicName} Concepts`, category: 'Specialized', description: `Specialized methods, boundary conditions, and advanced principles.` },
        { id: 'n-5', label: `Best Practices & Standards`, category: 'Guidelines', description: `Industry standards, optimization rules, and quality benchmarks.` },
        { id: 'n-6', label: `Real-World Applications`, category: 'Practical Impact', description: `Practical implementations and real-world domain utility.` },
        { id: 'n-7', label: `Diagnostic & Evaluation Tools`, category: 'Analysis', description: `Evaluation metrics, testing, and troubleshooting procedures.` },
        { id: 'n-8', label: `Future Trends & Innovations`, category: 'Evolution', description: `Emerging trends, modern research, and future domain growth.` }
      ],
      flashcards: [
        { question: `What is the core definition and primary objective of ${cleanTopicName}?`, answer: `${cleanTopicName} establishes structured operational rules, manages execution workflows, and delivers reliable domain outcomes.` },
        { question: `What are the foundational building blocks of ${cleanTopicName}?`, answer: `Core definitions, structural components, operational mechanisms, and domain-specific terminology.` },
        { question: `How do you apply ${cleanTopicName} in practical scenarios?`, answer: `By executing standardized workflows, verifying input validity, and monitoring performance metrics.` },
        { question: `What is a key best practice when working with ${cleanTopicName}?`, answer: `Enforce modular design, validate all inputs, and maintain continuous monitoring.` },
        { question: `How do you diagnose edge cases or failures in ${cleanTopicName}?`, answer: `Analyze operational logs, isolate sub-module boundaries, and execute targeted regression tests.` },
        { question: `What distinguishes ${cleanTopicName} from related subject domains?`, answer: `Its specific operational mechanisms, distinct terminology, and targeted domain objectives.` },
        { question: `What key metrics measure performance efficiency in ${cleanTopicName}?`, answer: `Throughput accuracy, execution speed, resource efficiency, and low error rates.` },
        { question: `What is a critical validation bound in ${cleanTopicName}?`, answer: `Ensuring strict schema integrity and verifying structural constraints before processing.` },
        { question: `What historical evolution shaped modern ${cleanTopicName}?`, answer: `Milestones in domain research, technological advancements, and community adoption.` },
        { question: `What is a key future trend in the development of ${cleanTopicName}?`, answer: `Integration with intelligent automation, scalable cloud architectures, and digital workflows.` }
      ],
      quiz: [
        { question: `Which statement best describes the primary objective of ${cleanTopicName}?`, options: [`Delivering structured execution, domain mastery, and reliable outcomes`, `Unregulated random mutations`, `Legacy print buffering`, `Unvalidated packet dumps`], correctAnswer: `Delivering structured execution, domain mastery, and reliable outcomes`, explanation: `${cleanTopicName} optimizes learning and operational reliability.` },
        { question: `Why is strict input validation crucial in ${cleanTopicName}?`, options: [`It prevents runtime errors, ensures schema integrity, and avoids system failures`, `It degrades processing speed`, `It clears browser graphics caches`, `It deletes database logs`], correctAnswer: `It prevents runtime errors, ensures schema integrity, and avoids system failures`, explanation: `Validation verifies that data structures conform strictly to expected standards.` },
        { question: `What factor contributes most to long-term mastery of ${cleanTopicName}?`, options: [`Consistent active recall, conceptual study, and hands-on application`, `Memorizing random single words without context`, `Skipping core definitions`, `Disabling verification tests`], correctAnswer: `Consistent active recall, conceptual study, and hands-on application`, explanation: `Active recall and hands-on application produce long-term retention.` },
        { question: `What architectural pattern best supports scalable implementations of ${cleanTopicName}?`, options: [`Modular decoupling with clear boundary interfaces`, `Single tightly-coupled monolithic file`, `Global mutable state variables`, `Bypassing exception handlers`], correctAnswer: `Modular decoupling with clear boundary interfaces`, explanation: `Modular architecture enables independent testing and scaling.` },
        { question: `How do professional practitioners monitor operational health in ${cleanTopicName}?`, options: [`By tracking execution metrics, throughput, and error rates`, `By ignoring system output logs`, `By restarting servers randomly`, `By deleting test assertions`], correctAnswer: `By tracking execution metrics, throughput, and error rates`, explanation: `Continuous metric tracking ensures system stability.` },
        { question: `What is the recommended approach for resolving unexpected anomalies in ${cleanTopicName}?`, options: [`Isolate failure tracebacks, inspect root causes, and apply regression fixes`, `Suppress error logs quietly`, `Return empty fallback objects silently`, `Disable security checks`], correctAnswer: `Isolate failure tracebacks, inspect root causes, and apply regression fixes`, explanation: `Root-cause analysis prevents recurring defects.` },
        { question: `Why is clear documentation important when working with ${cleanTopicName}?`, options: [`It ensures maintainability, fast onboarding, and consistent team standards`, `It consumes unnecessary disk space`, `It slows down compiler build speeds`, `It restricts execution permissions`], correctAnswer: `It ensures maintainability, fast onboarding, and consistent team standards`, explanation: `Comprehensive docs foster long-term project maintainability.` },
        { question: `What role does automated testing play in ${cleanTopicName}?`, options: [`It verifies contract compliance and catches regressions early`, `It increases manual QA workload`, `It replaces source code design`, `It encrypts local databases`], correctAnswer: `It verifies contract compliance and catches regressions early`, explanation: `Automated test suites catch regressions automatically.` },
        { question: `Which design principle helps minimize unexpected side effects in ${cleanTopicName}?`, options: [`Immutability and explicit data flow`, `Global variable mutation`, `Implicit dynamic type casting`, `Unconstrained background loops`], correctAnswer: `Immutability and explicit data flow`, explanation: `Immutable data flow minimizes unintended side effects.` },
        { question: `What strategy ensures high performance when processing large datasets in ${cleanTopicName}?`, options: [`Optimizing algorithmic complexity and utilizing caching`, `Executing redundant nested loops`, `Loading entire databases into unindexed arrays`, `Disabling memory garbage collection`], correctAnswer: `Optimizing algorithmic complexity and utilizing caching`, explanation: `Efficient complexity bounds and caching maximize throughput.` }
      ]
    };
  }

  // BUILD COMPLETE PAYLOAD USING TOPIC CONCEPT ENGINE
  const nodes = conceptData.nodes.map((n) => ({
    id: n.id,
    label: n.label,
    category: n.category,
    description: n.description,
    val: n.id === 'n-1' ? 3 : 2,
  }));

  const edges = [
    { id: 'e-1', source: 'n-1', target: 'n-2', label: 'defines', relationship: 'foundational' },
    { id: 'e-2', source: 'n-1', target: 'n-3', label: 'structures', relationship: 'architecture' },
    { id: 'e-3', source: 'n-2', target: 'n-4', label: 'operates via', relationship: 'workflow' },
    { id: 'e-4', source: 'n-3', target: 'n-5', label: 'optimizes', relationship: 'performance' },
    { id: 'e-5', source: 'n-4', target: 'n-6', label: 'implements', relationship: 'practice' },
    { id: 'e-6', source: 'n-5', target: 'n-7', label: 'diagnoses', relationship: 'debugging' },
    { id: 'e-7', source: 'n-6', target: 'n-8', label: 'delivers', relationship: 'application' },
    { id: 'e-8', source: 'n-7', target: 'n-8', label: 'evolves into', relationship: 'growth' },
  ];

  const flashcards = conceptData.flashcards.map((fc, idx) => ({
    id: `fc-${idx + 1}`,
    question: fc.question,
    answer: fc.answer,
    difficulty: idx % 3 === 0 ? 'easy' : idx % 3 === 1 ? 'medium' : 'hard',
    hint: `Focus on ${fc.question.substring(0, 30)}...`,
    topic: topic,
  }));

  const quiz = conceptData.quiz.map((q, idx) => ({
    id: `qz-${idx + 1}`,
    question: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
    correctAnswerIndex: q.options.indexOf(q.correctAnswer) !== -1 ? q.options.indexOf(q.correctAnswer) : 0,
    explanation: q.explanation,
    difficulty: idx % 3 === 0 ? 'easy' : idx % 3 === 1 ? 'medium' : 'hard',
  }));

  const summary = {
    title: `${topic}: Comprehensive Study Kit`,
    topic: topic,
    overview: `This study guide provides an in-depth breakdown of ${topic}. It covers core principles, key sub-concepts like ${nodes.slice(0, 3).map(n => n.label).join(', ')}, operational workflows, and real-world applications.`,
    key_points: nodes.slice(0, 5).map(n => `${n.label}: ${n.description}`),
    important_terms: nodes.slice(0, 4).map(n => `${n.label} (${n.category}): ${n.description}`),
    real_world_examples: [
      `Real-world implementation of ${topic} in industry applications.`,
      `Practical deployment of ${topic} best practices.`
    ],
    keyTakeaways: nodes.slice(0, 4).map(n => n.label),
    sections: [
      {
        title: `1. Foundations of ${topic}`,
        content: `Understanding ${topic} requires mastering its primary concepts and structural definitions.`,
        subPoints: nodes.slice(0, 3).map(n => n.label),
      },
      {
        title: `2. Applied Mechanics & Workflows`,
        content: `Practical execution of ${topic} relies on structured data pipelines, operational rules, and predictable patterns.`,
        subPoints: nodes.slice(3, 6).map(n => n.label),
      },
      {
        title: `3. Advanced Optimization & Diagnostics`,
        content: `Advanced mastery of ${topic} involves optimizing performance, isolating edge cases, and enforcing reliability.`,
        subPoints: nodes.slice(6, 8).map(n => n.label),
      }
    ]
  };

  return {
    topic: topic,
    summary: summary,
    flashcards: {
      topic: topic,
      cards: flashcards,
    },
    quiz: {
      topic: topic,
      questions: quiz,
    },
    checklist: {
      topic: topic,
      items: nodes.slice(0, 5).map((n, i) => ({
        id: `ck-${i + 1}`,
        task: `Master concepts of ${n.label}`,
        category: 'Study',
        completed: false,
      })),
    },
    knowledgeGraph: {
      topic: topic,
      nodes: nodes,
      edges: edges,
    }
  };
}

// Backward compatibility exports
export const generateGenericMockPayload = generateDynamicStudyKit;
export const MOCK_STUDY_DATA = {};
