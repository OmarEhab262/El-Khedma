# الفصل الأول: أساسيات Node.js (Node.js Fundamentals)

---

## 1.1 يعني إيه Node.js؟ (What is Node.js?)

### 🔹 يعني إيه؟
**Node.js** ليس لغة برمجة، وليس Framework!
Node.js هو **بيئة تشغيل (JavaScript Runtime Environment)** خفيفة وسريعة تسمح لك بتشغيل لغة JavaScript خارج المتصفح (على السيرفر أو على جهازك الشخصي).

تعتمد Node.js على محرك **V8** الخارق الخاص بمتصفح Google Chrome، والذي يقوم بتحويل كود JavaScript مباشرة إلى **Machine Code** تفهمه أجهزة الكمبيوتر بسرعة فائقة.

---

### 🔹 ليه بنستخدمه؟
قبل ظهور Node.js عام 2009 بواسطة *Ryan Dahl*، كانت JavaScript تُستخدم حصرياً داخل متصفحات الويب لإضافة تفاعلية للواجهات (Frontend). أما الـ Backend فكان يتطلب لغات مثل PHP, Java, C#, أو Python.

مع ظهور Node.js أصبح بإمكان المطورين:
1. **Full-Stack with JavaScript:** استخدام لغة واحدة (JavaScript) لكتابة الـ Frontend والـ Backend.
2. **High Performance & I/O Speed:** تميز Node.js بالتعامل الممتاز مع العمليات المعتمدة على الإدخال والإخراج (I/O Intensive) مثل قراءة الملفات، والتعامل مع قواعد البيانات، والشبكات.
3. **Non-blocking I/O:** لا تنتظر العمليات البطيئة لتنتهي، بل تستمر في تنفيذ الأكواد الأخرى مما يجعلها خفيفة جداً في استخدام الموارد.
4. **Rich Ecosystem:** امتلاك أكبر مستودع حزم برمجة في العالم وهو **NPM (Node Package Manager)**.

---

### 🔹 بيشتغل إزاي من الداخل؟ (High-Level Overview)
Node.js يعتمد على ثلاث مكونات رئيسية:
1. **V8 Engine:** المحرك الذي يترجم كود JavaScript إلى كود آلة (Machine Code).
2. **Libuv:** مكتبة مكتوبة بلغة C++ مسؤولة عن إدارة الـ **Event Loop** والتفاعل مع نظام التشغيل (الأقسام المتقدمة في الفصل الثاني تفصل ذلك).
3. **Node.js Binding / Core APIs:** الأكواد والمكتبات التي توفر لك الوصول للنظام مثل (File System, HTTP, OS).

```
+-------------------------------------------------------+
|                     Your App Code                     |
+-------------------------------------------------------+
|               Node.js Core APIs (fs, http, path)      |
+-------------------------------------------------------+
|   V8 Engine (JS Execution)   |  Libuv (Event Loop & Async)|
+-------------------------------------------------------+
|                    Operating System                   |
+-------------------------------------------------------+
```

---

### 🔹 إمتى نستخدمه؟ (When to use Node.js?)

✅ **حالات استخدام مثالية (Best Use Cases):**
* **Real-time Applications:** تطبيقات الدردشة (Chat Apps)، الإشعارات المباشرة (Notifications)، الألعاب الجماعية عبر أجهزة التلفاز/الهاتف.
* **RESTful APIs & Microservices:** بناء APIs سريعة وخفيفة للتطبيقات والمواقع.
* **Streaming Applications:** تطبيقات بث الفيديو والصوت (مثل Netflix).
* **Single Page Applications (SPAs) Backends:** خوادم تتكامل بسلاسة مع React, Vue, Angular.
* **CLI Tools:** بناء أدوات سطر أوامر تفاعلية.

❌ **متى تجتنب استخدام Node.js؟ (When NOT to use Node.js?):**
* **CPU-Intensive Tasks:** العمليات التي تتطلب معالجة ضخمة للمعالج (مثل معالجة الفيديو، الذكاء الاصطناعي، التشفير المعقد). لأن Node.js يعمل على **Single Thread** بطبيعته، وبالتالي العملية الثقيلة ستعطل باقي الطلبات.

---

### 🔹 REPL و Hello World

#### 1. ما هو الـ REPL؟
كلمة **REPL** تعني:
* **R**ead: يقرأ المدخلات من المستخدم.
* **E**val: يقوم بتقييم وتنفيذ الكود.
* **P**rint: يطبع النتيجة.
* **L**oop: يعود للبداية لينتظر المدخلات التالية.

يمكنك الدخول إلى الـ REPL بمجرد كتابة `node` في سطر الأوامر (Terminal):

```bash
$ node
Welcome to Node.js v20.x.x.
Type ".help" for more information.
> console.log("Hello, World!");
Hello, World!
undefined
> 10 + 20
30
> .exit
```

#### 2. تشغيل أول برنامج Node.js عبر ملف
قم بإنشاء ملف باسم `app.js`:

```javascript
// app.js
const appName = "Node.js Mastery";
console.log(`Welcome to ${appName}!`);

function greet(name) {
    return `Hello, ${name} from Node.js`;
}

console.log(greet("Developer"));
```

لتشغيله من سطر الأوامر:
```bash
$ node app.js
Welcome to Node.js Mastery!
Hello, Developer from Node.js
```

---

## 1.2 المتصفح ضد Node.js (Browser vs Node.js)

على الرغم من أن الاثنين يستخدمان لغة JavaScript، إلا أن **بيئة التشغيل (Environment)** مختلفة تماماً!

| الميزة / الكائن | Browser (المتصفح) | Node.js |
| :--- | :--- | :--- |
| **الهدف الأساسي** | التفاعل مع المستخدم عبر واجهات DOM | التعامل مع السيرفر، الملفات، وقواعد البيانات |
| **Global Object** | `window` | `global` |
| **التعامل مع DOM** | يملك `document`, `window`, `Element` | **لا يوجد DOM** (الكائنات هذه غير موجودة) |
| **File System** | محظور لأسباب أمنية | توجد مكتبة `fs` للتعامل التام مع الملفات |
| **Network & OS** | محدود بالطلب عبر HTTP/WebSockets | الوصول لكروت الشبكة والنظام عبر `net`, `http`, `os` |
| **Module Systems** | ES Modules (`import`/`export`) | CommonJS (`require`) و ES Modules |

---

### 🔹 أخطاء شائعة (Common Pitfalls)

1. **محاولة استخدام `window` أو `document` في Node.js:**
   ```javascript
   // Error in Node.js
   console.log(window.innerWidth); // ReferenceError: window is not defined
   console.log(document.getElementById("btn")); // ReferenceError: document is not defined
   ```

2. **اعتقاد أن Node.js لغة مختلفة عن JavaScript:**
   Node.js هي نفس قواعد وأساسيات لغة JavaScript (ES6+)، الاختلاف فقط في الـ Web APIs المتوفرة مقارنة بـ Node APIs.

---

### 🔹 Best Practices

* استخدم الدالة الموحدة `globalThis` للوصول للـ Global Scope سواء كنت تكتب كود يعمل في المتصفح أو في Node.js.
* حافظ على تحديث نسخة Node.js للاستفادة من أحدث الميزات الأمنية والأداء لـ V8 Engine.

---

### 🔹 أسئلة Interview

**س1: ما هو الفرق بين V8 Engine و Node.js؟**
* **الإجابة:** V8 هو محرك مفتوح المصدر من Google يقوم بتنفيذ وترجمة كود JavaScript إلى كود آلة. أما Node.js فهو بيئة تشغيل تستخدم V8 بالإضافة إلى مكتبات C++ (مثل Libuv) لتوفير ميزات الإدخال والإخراج والتعامل مع الملفات والشبكات.

**س2: لماذا تعتبر Node.js غير مناسبة للتطبيقات ذات الاستهلاك العالي للمعالج (CPU-Intensive Applications)؟**
* **الإجابة:** لأن Node.js تعتمد على مسار رئيسي واحد لتنفيذ الأكواد (Single-Threaded Event Loop)، فإذا قمت بعملية تحتاج إلى معالجة حساسية وطويلة على المعالج، سيتم حظر (Block) هذا المسار وتوقف معالجة باقي طلبات باقي المستخدمين حتى تنتهي العملية.

---

## 1.3 الأنظمة النمطية (Modules System)

### 🔹 يعني إيه؟
الـ **Module** هو ببساطة ملف JavaScript يحتوي على كود (متغيرات، دوال، Classes) معزول عن باقي الملفات. يمكنك "تصدير" (Export) أجزاء معينة من هذا الكود لاستخدامها في ملفات أخرى، و"استيراد" (Import) ما تحتاجه من ملفات خارجية.

### 🔹 ليه بنستخدمه؟
1. **التنظيم (Organization):** بدلاً من كتابة آلاف الأسطر في ملف واحد، نقسم الكود لملفات صغيرة سهلة القراءة.
2. **إعادة الاستخدام (Reusability):** تكتب الكود مرة واحدة وتستخدمه في أماكن متعددة.
3. **العزل (Encapsulation):** حماية المتغيرات من التداخل مع ملفات أخرى (تجنب تلوث الـ Global Scope).

---

### 🔹 CommonJS vs ES Modules

في عالم Node.js، يوجد نظامان مشهوران للتعامل مع الـ Modules:

#### 1. نظام CommonJS (CJS) - النظام التقليدي
هذا هو النظام الافتراضي في Node.js منذ بدايته. يستخدم `require` للاستيراد و `module.exports` للتصدير.

**مثال للتصدير (logger.js):**
```javascript
// logger.js
const log = (msg) => console.log(`[LOG]: ${msg}`);
module.exports = log;
```

**مثال للاستيراد (app.js):**
```javascript
// app.js
const log = require('./logger');
log('CommonJS is working!');
```

#### 2. نظام ES Modules (ESM) - النظام الحديث
هو المعيار العالمي للغة JavaScript (ECMAScript). يستخدم `import` و `export`. لتفعيله في Node.js، يجب إضافة `"type": "module"` في ملف `package.json` أو استخدام امتداد `.mjs`.

**مثال للتصدير (math.js):**
```javascript
// math.js
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
```

**مثال للاستيراد (app.js):**
```javascript
// app.js
import { add } from './math.js';
console.log(add(5, 3));
```

---

### 🔹 الأنواع الثلاثة للـ Modules في Node.js

1. **Local Modules:** ملفات أنت من يقوم بإنشائها في مشروعك.
2. **Built-in (Core) Modules:** مكتبات تأتي مبنية داخل Node.js ولا تحتاج لتثبيت (مثل `fs`, `path`, `http`).
3. **Third-party Modules:** مكتبات قام مطورون آخرون بكتابتها وتقوم بتثبيتها عبر NPM (مثل `express`, `mongoose`).

---

## 1.4 الـ Core Modules و الـ Caching

### 🔹 أشهر الـ Built-in Modules

* **`fs` (File System):** للتعامل مع الملفات والمجلدات.
* **`path`:** للتعامل مع مسارات الملفات بطريقة صحيحة عبر أنظمة التشغيل المختلفة.
* **`os`:** للحصول على معلومات عن نظام التشغيل (المعالج، الذاكرة، إلخ).
* **`http`:** لإنشاء سيرفر ويب (الأساس الذي بني عليه Express).

```javascript
const os = require('os');
const path = require('path');

console.log('Free Memory:', os.freemem());
console.log('File Extension:', path.extname(__filename));
```

---

### 🔹 كيف يعمل التصدير (Exports)؟
يوجد فرق بسيط ومهم بين `module.exports` و `exports`:
* `module.exports`: هو الكائن الفعلي الذي يتم إرجاعه عند عمل `require`.
* `exports`: هو مجرد "مرجع" (Reference) يشير إلى `module.exports`.

**القاعدة الذهبية:** دائماً استخدم `module.exports` لتجنب الأخطاء إذا كنت ستقوم بتصدير كائن كامل أو دالة واحدة.

---

### 🔹 ميزة الـ Module Caching
عندما تقوم بعمل `require` لملف معين لأول مرة، يقوم Node.js بتنفيذ الكود وتخزين النتيجة في الـ **Cache**. إذا قمت بعمل `require` لنفس الملف مرة أخرى في مكان آخر، لن يعيد Node.js تنفيذ الكود، بل سيعطيك النسخة المخزنة مسبقاً.

**لماذا؟** لتوفير الأداء ومنع تكرار العمليات الثقيلة.

---

### 🔹 أخطاء شائعة (Common Pitfalls)

1. **الخلط بين ESM و CommonJS:** لا يمكنك استخدام `import` داخل ملف يستخدم `require` (إلا في حالات خاصة ومعقدة). اختر نظاماً واحداً لمشروعك.
2. **نسيان المسار النسبي (`./`):** عند استيراد Local Module، يجب كتابة `./`. بدونه، سيبحث Node.js في الـ Built-in modules أو مجلد `node_modules`.

---

### 🔹 Best Practices

* يفضل دائماً استخدام **ES Modules** في المشاريع الجديدة لأنه المعيار الحديث والمدعوم من جميع البيئات.
* اجعل كل Module مسؤولاً عن وظيفة واحدة فقط (Single Responsibility Principle).

---

### 🔹 أسئلة Interview

**س1: ما هو الفرق بين `require` و `import`؟**
* **الإجابة:** `require` هو جزء من CommonJS، يتم تحميله وقت التنفيذ (Runtime)، بينما `import` هو جزء من ES Modules ويتم تحميله وقت التحليل (Parse time) مما يسمح بعمليات تحسين مثل Tree-shaking.

**س2: ماذا يحدث إذا قمت بعمل `require` لنفس الملف 5 مرات في أماكن مختلفة؟**
* **الإجابة:** سيتم تنفيذ الكود داخل الملف مرة واحدة فقط في المرة الأولى، وفي المرات الأربعة التالية سيتم استرجاع النتيجة من الـ Cache.

---

### 🔹 تمارين للتأكد من فهمك

1. **تمرين 1:** أنشئ ملف `utils.js` يحتوي على دالة تحول النص إلى Capital Case، ثم استوردها في `app.js` واستخدمها.
2. **تمرين 2:** استخدم Module `os` لطباعة اسم نظام التشغيل الخاص بك ومساحة الذاكرة الكلية (Total Memory) بالـ GB.



# الفصل الثاني: كيف تعمل Node.js من الداخل؟ (Node.js Internals)

---

## 2.1 نظام الملفات: Blocking vs Non-blocking

### 🔹 يعني إيه؟
في البرمجة التقليدية (مثل Java أو PHP القديم)، عندما تطلب من السيرفر قراءة ملف ضخم، يتوقف السيرفر تماماً عن تنفيذ أي كود آخر حتى تنتهي قراءة الملف. هذا يسمى **Blocking (Synchronous)**.

في Node.js، نستخدم مفهوم الـ **Non-blocking (Asynchronous)**، حيث تطلب من السيرفر قراءة الملف، وتعطيه "وظيفة" (Callback) ينفذها عندما ينتهي، وفي الوقت نفسه يكمل السيرفر تنفيذ باقي الأكواد دون انتظار.

---

### 🔹 ليه بنستخدمه؟
تخيل مطعماً فيه طباخ واحد (Single Thread).
* **Blocking:** الطباخ يجهز الطلب وينتظر بجانبه حتى ينضج، ولا يستقبل أي طلب جديد. (زبون واحد سعيد، والباقي غاضبون في الخارج).
* **Non-blocking:** الطباخ يضع الطعام على النار، ويذهب لاستقبال طلبات الزبائن الآخرين وتجهيز المقبلات. عندما ينضج الطعام، يعود لتقديمه. (كل الزبائن تتم خدمتهم بكفاءة).

هذا هو سر سرعة Node.js في التعامل مع آلاف المستخدمين في نفس الوقت بموارد بسيطة.

---

### 🔹 أمثلة عملية كاملة

#### 1. الطريقة الـ Blocking (تجنبها في الـ Backend):
```javascript
const fs = require('fs');

console.log('1. البدء في قراءة الملف...');
const data = fs.readFileSync('large-file.txt', 'utf-8'); // السيرفر سيتوقف هنا!
console.log('2. محتوى الملف:', data.substring(0, 20));
console.log('3. كود آخر يتم تنفيذه بعد القراءة');
```

#### 2. الطريقة الـ Non-blocking (الطريقة الصحيحة):
```javascript
const fs = require('fs');

console.log('1. البدء في قراءة الملف...');
fs.readFile('large-file.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('2. تم انتهاء القراءة، المحتوى:', data.substring(0, 20));
});
console.log('3. كود آخر يتم تنفيذه فورا دون انتظار!');
```

**النتيجة في الـ Terminal:**
```
1. البدء في قراءة الملف...
3. كود آخر يتم تنفيذه فورا دون انتظار!
2. تم انتهاء القراءة، المحتوى: ...
```

---

## 2.2 الـ Buffers و الـ Streams

### 🔹 يعني إيه؟
* **Buffer:** هو مساحة مؤقتة في الذاكرة (RAM) تُستخدم لتخزين البيانات الثنائية (Binary Data) أثناء انتقالها من مكان لآخر.
* **Stream:** هو تدفق مستمر للبيانات. بدلاً من تحميل الملف كاملاً في الذاكرة (Buffer)، نقوم بقراءته "قطعة قطعة" (Chunks).

---

### 🔹 ليه بنستخدمه؟
تخيل أنك تشاهد فيلماً على YouTube مساحته 4GB ورام جهازك 2GB.
* لو استخدمنا **Buffer** فقط، سيفشل الجهاز في تحميل الفيلم لأنه أكبر من الذاكرة.
* باستخدام **Streams**، يقوم YouTube بإرسال قطع صغيرة (مثلاً كل ثانية)، يشاهدها المستخدم ثم يتم مسحها من الذاكرة واستقبال القطعة التالية.

هذا يوفر الذاكرة بشكل هائل ويجعل التطبيق سريعاً جداً.

---

### 🔹 مثال عملي على الـ Streams

```javascript
const fs = require('fs');

// إنشاء تيار قراءة (Read Stream)
const readStream = fs.createReadStream('./big-file.txt', { encoding: 'utf-8' });

readStream.on('data', (chunk) => {
    console.log('--- استلمنا قطعة جديدة من البيانات ---');
    console.log(chunk.substring(0, 50)); // نطبع جزء من القطعة
});

readStream.on('end', () => {
    console.log('✅ تم الانتهاء من قراءة الملف بالكامل عبر الـ Streams');
});
```

---

## 2.3 مكتبة Libuv و الـ Thread Pool

### 🔹 بيشتغل إزاي من الداخل؟
نحن نقول أن Node.js تعمل بمسار واحد (Single Threaded)، فكيف تقوم بقراءة ملفات ضخمة أو الاتصال بقاعدة بيانات في الخلفية؟

هنا يأتي دور **Libuv**. هي مكتبة بلغة C++ داخل Node.js تملك ما يسمى بـ **Thread Pool** (عادة يحتوي على 4 مسارات إضافية).

عندما تطلب عملية ثقيلة (مثل قراءة ملف `fs` أو تشفير `crypto`)، يقوم Node.js بإرسال هذه المهمة إلى Libuv، والتي تنفذها في الـ Thread Pool الخاص بها. عندما تنتهي، تعيد النتيجة إلى الـ Event Loop.

---

## 2.4 الـ Event Loop، الـ Call Stack، والـ Callback Queue

هذا هو "قلب" Node.js وأهم سؤال في أي Interview!

### 1. Call Stack (المكان الذي ينفذ فيه الكود حالياً)
أي وظيفة (Function) تطلبها توضع فوق الـ Stack. Node.js ينفذ الوظيفة التي في القمة ثم يزيلها.

### 2. Web/Node APIs (المكان الذي تنتظر فيه العمليات الخارجية)
العمليات غير المتزامنة (مثل `setTimeout` أو `readFile`) تخرج من الـ Stack وتنتظر هنا حتى تنتهي.

### 3. Callback Queue (قائمة الانتظار)
بمجرد انتهاء العملية الخارجية، توضع الـ Callback Function الخاصة بها في هذه القائمة.

### 4. Event Loop (المنظم)
وظيفته الوحيدة هي مراقبة الـ Call Stack. إذا وجد الـ Stack **فارغاً**، يأخذ أول وظيفة من الـ Callback Queue ويضعها في الـ Stack ليتم تنفيذها.

---

### 🔹 أخطاء شائعة (Common Pitfalls)

1. **حظر الـ Event Loop (Blocking the Event Loop):**
   كتابة حلقة تكرار (Loop) ضخمة جداً أو عملية حسابية معقدة في المسار الرئيسي تجعل السيرفر لا يرد على أي مستخدم آخر.
   ```javascript
   // ❌ خطأ كارثي
   while(true) { /* عملية حسابية ثقيلة */ } 
   // السيرفر سيتوقف تماما!
   ```

2. **اعتقاد أن كل شيء في Node.js هو Non-blocking:**
   بعض الدوال لها نسخة Blocking ونسخة Non-blocking (مثل `readFileSync` vs `readFile`). دائماً استخدم النسخة غير المتزامنة في السيرفر.

---

### 🔹 أسئلة Interview

**س1: اشرح باختصار كيف تعمل الـ Event Loop؟**
* **الإجابة:** هي حلقة تراقب الـ Call Stack والـ Callback Queue. إذا كان الـ Stack فارغاً، تقوم بنقل الوظائف المنتظرة في الـ Queue إلى الـ Stack ليتم تنفيذها.

**س2: متى نستخدم الـ Streams بدلاً من الـ Buffer العادي؟**
* **الإجابة:** نستخدم الـ Streams عند التعامل مع ملفات ضخمة أو بيانات تدفقية (مثل الفيديو) لتوفير استهلاك الذاكرة (RAM) وتحسين سرعة البدء في معالجة البيانات.

---

### 🔹 تمارين للتأكد من فهمك

1. **تمرين 1:** أنشئ ملفاً نصياً كبيراً (يمكنك تكرار نص معين فيه كثيراً)، ثم اكتب كوداً يستخدم `fs.createReadStream` لقراءته وحساب عدد الحروف الكلي فيه دون تحميله كاملاً في الذاكرة.
2. **تمرين 2:** باستخدام `setTimeout` و `console.log` و `fs.readFile` (على ملف صغير)، حاول توقع ترتيب ظهور الرسائل في الـ Terminal لتختبر فهمك للـ Event Loop.



# الفصل الثالث: NPM & CLI

---

## 3.1 إدارة الحزم (Package Management - NPM)

### 🔹 يعني إيه؟
**NPM** هو اختصار لـ **Node Package Manager**. هو ببساطة عبارة عن مخزن ضخم يحتوي على ملايين المكتبات والأدوات البرمجية (Packages) التي صنعها مطورون آخرون، ويسمح لك بتحميلها واستخدامها في مشروعك بدلاً من إعادة اختراع العجلة.

### 🔹 ليه بنستخدمه؟
1. **Reuse Code:** عدم الحاجة لكتابة كود من الصفر (مثل التعامل مع التواريخ، التشفير، الاتصال بقواعد البيانات).
2. **Easy Updates:** سهولة تحديث المكتبات.
3. **Dependency Management:** إدارة الاعتمادات بين المكتبات بشكل آلي ومنظم.

### 🔹 إزاي؟
- **تثبيت مكتبة:** `npm install <package_name>`
- **حذف مكتبة:** `npm uninstall <package_name>`
- **تثبيت عالمي:** `npm install -g <package_name>` (للأدوات التي تعمل من سطر الأوامر).

---

## 3.2 ملف `package.json`

### 🔹 يعني إيه؟
هو "البطاقة الشخصية" لمشروعك. ملف بصيغة JSON يحتوي على تفاصيل المشروع، اسم المكتبات التي يعتمد عليها (Dependencies)، إصدارات المشروع، والسكربتات الخاصة بالتشغيل.

### 🔹 ليه؟
بدون هذا الملف، لا يعرف Node.js ما هي المكتبات المطلوبة لتشغيل مشروعك، ولن يستطيع الآخرون تشغيل مشروعك بسهولة.

### 🔹 إزاي؟
يمكنك إنشاؤه تلقائياً بالأمر: `npm init -y`

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My first CLI app",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

---

## 3.3 إنشاء أدوات سطر الأوامر (Create CLI Apps)

### 🔹 يعني إيه؟
هي برامج تقوم بكتابتها بلغة JavaScript وتُشغلها مباشرة من الـ Terminal (مثل `git`, `npm`, `docker`).

### 🔹 إزاي؟
1. إضافة `"bin"` في ملف `package.json`.
2. إضافة السطر الشهير `#!/usr/bin/env node` في بداية ملف التشغيل (Shebang).
3. ربط الأداة محلياً بالأمر: `npm link`.

---

## 3.4 متغيرات البيئة (Environment Variables)

### 🔹 يعني إيه؟
هي متغيرات خارجية عن الكود، تُستخدم لتخزين معلومات حساسة (مثل API Keys) أو إعدادات متغيرة حسب البيئة (Development vs Production).

### 🔹 ليه؟
لتأمين البيانات الحساسة وعدم رفعها على GitHub، ولتسهيل تغيير الإعدادات دون تعديل الكود.

### 🔹 إزاي؟
استخدام مكتبة مثل `dotenv`:
```bash
npm install dotenv
```
في الكود:
```javascript
require('dotenv').config();
console.log(process.env.DB_PASSWORD);
```

---

## 🏆 Best Practices
- دائماً استخدم `.gitignore` لملف `node_modules`.
- التزم بإصدارات المكتبات (Semantic Versioning).
- لا تضع بيانات سرية مباشرة في الكود.

---

## ❓ أسئلة وتمارين
1. **سؤال:** ما الفرق بين `dependencies` و `devDependencies`؟
2. **تمرين:** قم بإنشاء CLI App بسيط يطبع اسم المستخدم المدخل كـ argument.



# الفصل الرابع: HTTP & Express.js

---

## 4.1 مقدمة في HTTP و Node.js

### 🔹 يعني إيه HTTP؟
**HTTP** (Hypertext Transfer Protocol) هو البروتوكول الأساسي الذي يعمل عليه الويب. هو "اللغة" التي يتحدث بها المتصفح (العميل) مع السيرفر.
ببساطة: المتصفح يرسل **طلب (Request)**، والسيرفر يرسل **استجابة (Response)**.

### 🔹 ليه لازم نفهم HTTP؟
لأن أي تطبيق ويب تقوم ببنائه (API أو موقع) يعتمد كلياً على فهم دورة الـ Request-Response:
1. فهم الـ **Methods** (GET, POST, PUT, DELETE).
2. فهم الـ **Status Codes** (200, 404, 500).
3. التعامل مع **Headers** و **Body**.

---

## 4.2 بناء سيرفر HTTP بسيط (بدون مكتبات خارجية)

### 🔹 إزاي؟
يوفر Node.js مكتبة مدمجة تسمى `http`.

### 🔹 مثال:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
```

### 🔹 المشكلة:
بناء سيرفر معقد باستخدام `http` فقط أمر شاق (Routing، Middleware، parsing). هنا يأتي دور **Express.js**.

---

## 4.3 إطار العمل Express.js

### 🔹 يعني إيه Express؟
Express.js هو أشهر Framework لـ Node.js، يوفر بنية منظمة وسهلة للتعامل مع الطلبات والردود.

### 🔹 ليه Express؟
1. **Routing:** تنظيم الروابط بشكل نظيف.
2. **Middleware:** معالجة الطلب قبل وصوله للـ Handler النهائي.
3. **Template Engines:** دعم عرض الصفحات.
4. **Community:** دعم هائل ومكتبات كثيرة.

### 🔹 إزاي (التثبيت):
```bash
npm install express
```

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello Express!');
});

app.listen(3000);
```

---

## 4.4 مفهوم الـ RESTful APIs

### 🔹 يعني إيه REST؟
هو أسلوب معماري (Architectural Style) لتصميم الـ APIs. يعتمد على استخدام الـ HTTP Methods للتعبير عن العمليات:
* **GET**: للحصول على بيانات.
* **POST**: لإنشاء بيانات جديدة.
* **PUT/PATCH**: لتعديل بيانات موجودة.
* **DELETE**: لحذف بيانات.

### 🔹 مثال:
```javascript
app.get('/api/users', (req, res) => { ... });
app.post('/api/users', (req, res) => { ... });
```

---

## 4.5 الـ Routing و Middleware

### 🔹 يعني إيه Routing؟
تحديد المسار الذي يجب أن يسلكه الطلب بناءً على URL والـ Method.

### 🔹 يعني إيه Middleware؟
هي دوال تُنفذ في "منتصف" دورة حياة الطلب. كل Middleware يمكنه:
1. تنفيذ أي كود.
2. تعديل الـ Request/Response.
3. إنهاء دورة الطلب أو استدعاء `next()` للانتقال للـ Middleware التالي.

### 🔹 مثال:
```javascript
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // مهم جداً للانتقال للخطوة التالية!
});
```

---

## 4.6 معالجة الأخطاء والـ CORS

### 🔹 معالجة الأخطاء (Error Handling)
في Express، نستخدم Middleware خاص يستقبل 4 معاملات (err, req, res, next).

```javascript
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
```

### 🔹 الـ CORS (Cross-Origin Resource Sharing)
بسبب سياسات الأمان في المتصفحات، لا يمكن لموقع في (Domain A) طلب API من (Domain B) إلا إذا سمح السيرفر بذلك. نستخدم مكتبة `cors`.

```bash
npm install cors
```
```javascript
const cors = require('cors');
app.use(cors());
```

---

### 🔹 Best Practices
1. **فصل الكود:** لا تضع كل الـ Routing في `app.js`؛ استخدم `express.Router`.
2. **Validation:** استخدم مكتبات مثل `Joi` أو `Zod` للتحقق من بيانات الـ Body.
3. **Environment Variables:** استخدم `dotenv` لإخفاء الـ Secrets.
4. **Error Handling:** تأكد من وجود Global Error Handler.

---

### 🔹 أسئلة Interview
1. **ما هو الـ Middleware في Express؟**
   دالة تعمل كوسيط بين الطلب (Request) والاستجابة (Response) ويمكنها تعديل البيانات أو إيقاف الطلب.
2. **ما الفرق بين app.use و app.get؟**
   `app.use` يعمل مع كل الطلبات (أو مسار محدد) بغض النظر عن الـ Method، بينما `app.get` مخصص فقط لطلبات GET.

---

### 🔹 تمارين
1. أنشئ سيرفر Express بسيط بمسار `/hello` يعيد JSON باسمك.
2. أنشئ Middleware يقوم بطباعة توقيت الطلب في الـ Console.
3. فعل الـ CORS في سيرفرك.



# الفصل الخامس: قواعد البيانات (MongoDB & Mongoose)

---

## 5.1 مقدمة في MongoDB و NoSQL

### 🔹 يعني إيه؟
**MongoDB** هي قاعدة بيانات من نوع **NoSQL**، وتحديداً **Document-oriented**. بدلاً من الجداول والصفوف (كما في MySQL)، نقوم بتخزين البيانات في شكل مستندات (Documents) تشبه الـ JSON وتسمى **BSON**.

### 🔹 ليه بنستخدمه؟
1. **المرونة (Flexibility):** لا تحتاج لتعريف جدول ثابت مسبقاً، يمكنك إضافة حقول جديدة لأي Document بسهولة.
2. **السرعة وقابلية التوسع (Scalability):** مصممة لتتعامل مع كميات ضخمة من البيانات وتدعم الـ Sharding (توزيع البيانات على سيرفرات متعددة).
3. **التوافق مع JavaScript:** البيانات تُخزن وتُسترجع بتنسيق يشبه الـ Objects في JS، مما يجعلها الاختيار الأول لمطوري Node.js.

---

## 5.2 استخدام Mongoose

### 🔹 يعني إيه؟
**Mongoose** هي مكتبة (ODM - Object Data Modeling) تعمل كـ "وسيط" احترافي بين Node.js وقاعدة بيانات MongoDB. هي توفر لنا هيكلية (Schemas) ونظاماً قوياً للتحقق من البيانات (Validation).

---

### 🔹 خطوات العمل الأساسية

#### 1. تعريف الـ Schema والـ Model
الـ **Schema** هي "الخريطة" التي تحدد شكل البيانات، والـ **Model** هو "الأداة" التي نستخدمها للتعامل مع قاعدة البيانات.

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'الاسم مطلوب'] },
    email: { type: String, unique: true, lowercase: true },
    age: Number,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
```

#### 2. عمليات الـ CRUD (Create, Read, Update, Delete)

*   **Create:**
    ```javascript
    const newUser = await User.create({ name: 'Omar', email: 'omar@example.com', age: 25 });
    ```
*   **Read:**
    ```javascript
    const users = await User.find({ age: { $gte: 18 } }); // البحث عن البالغين
    const singleUser = await User.findById('ID_HERE');
    ```
*   **Update:**
    ```javascript
    await User.findByIdAndUpdate(id, { age: 26 }, { new: true });
    ```
*   **Delete:**
    ```javascript
    await User.findByIdAndDelete(id);
    ```

---

## 5.3 مفاهيم متقدمة

### 1. العلاقات والـ Populate
لربط البيانات ببعضها (مثلاً: منشور وصاحبه)، نستخدم الـ `ObjectId`.
```javascript
const postSchema = new mongoose.Schema({
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// لاسترجاع المنشور مع بيانات صاحبه كاملة:
const post = await Post.find().populate('author');
```

### 2. الـ Aggregation Pipeline
هي "محرك التحليل" في MongoDB. تسمح لك بعمليات معالجة معقدة للبيانات (مثل حساب متوسط الأعمار أو ترتيب المنتجات الأكثر مبيعاً) في خطوات متتالية ($match, $group, $sort).

### 3. الـ Pagination (تقسيم النتائج)
مهمة جداً للأداء. لا تسحب مليون منتج مرة واحدة، بل اسحب 10 في كل صفحة.
```javascript
const page = 1;
const limit = 10;
const skip = (page - 1) * limit;
const results = await Product.find().skip(skip).limit(limit);
```

---

### 🔹 Best Practices
*   استخدم الـ **Indexes** على الحقول التي تبحث فيها كثيراً (مثل البريد الإلكتروني) لتسريع الاستعلامات.
*   قم دائماً بعمل **Validation** في الـ Schema لمنع دخول بيانات خاطئة.
*   استخدم `unique: true` للحقول التي لا يجب أن تتكرر لضمان سلامة البيانات على مستوى قاعدة البيانات.

---

### 🔹 أسئلة Interview
**س: ما الفرق بين Embedding و Referencing في MongoDB؟**
*   **Embedding:** وضع البيانات الفرعية داخل المستند الرئيسي (أسرع في القراءة ولكن حجم المستند محدود).
*   **Referencing:** تخزين ID فقط واستخدام `populate` (أفضل للبيانات الضخمة أو المشتركة بين مستندات كثيرة).

---

### 🔹 تمارين
1. أنشئ Schema لـ "Product" يحتوي على (الاسم، السعر، التصنيف، والكمية).
2. اكتب كوداً يقوم بحساب إجمالي قيمة المخزن (سعر المنتج × الكمية) لكل التصنيفات باستخدام الـ Aggregation.



# الفصل السادس: التوثيق والصلاحيات (Authentication & Authorization)

---

## 6.1 مقدمة: الفرق بين التوثيق والصلاحيات

### 🔹 يعني إيه؟
غالباً ما يتم خلط المفهومين معاً، لكنهما مختلفان تماماً:
1.  **التوثيق (Authentication - AuthN):** هو التأكد من "هوية" المستخدم. (مين أنت؟). مثال: تسجيل الدخول بالإيميل والباسورد.
2.  **الصلاحيات (Authorization - AuthZ):** هو التأكد مما "يُسمح" للمستخدم بفعله. (مسموح لك تعمل إيه؟). مثال: هل أنت "مدير" (Admin) لتمسح مستخدماً آخر، أم "مستخدم عادي"؟

### 🔹 ليه بنحتاجهم؟
بدونهم، ستكون بيانات تطبيقك مشاعاً للجميع. نحتاجهم لـ:
*   حماية بيانات المستخدمين الشخصية.
*   منع الوصول غير المصرح به لمناطق التحكم (Admin Panel).
*   تخصيص التجربة لكل مستخدم بناءً على هويته.

---

## 6.2 نظام التسجيل والدخول (Login/Register)

### 🔹 يعني إيه؟
هي البوابة الرئيسية لأي تطبيق. 
*   **Register:** استقبال بيانات المستخدم الجديد وتخزينها.
*   **Login:** التحقق من صحة البيانات المدخلة ومقارنتها بما هو مخزن.

### 🔹 إزاي بنفذهم؟ (The Logic Flow)
1.  **في التسجيل:** نتحقق أن الإيميل غير موجود مسبقاً، نشفر الباسورد، ثم نحفظ المستخدم.
2.  **في الدخول:** نبحث عن المستخدم بالإيميل، نقارن الباسورد المشفر، إذا تطابقا ننشئ "Token" للمستخدم.

---

## 6.3 تشفير كلمات المرور (Password Hashing)

### 🔹 يعني إيه؟
أوعى أبداً (Never!) تخزن كلمة المرور كما هي (Plain Text) في قاعدة البيانات. الـ **Hashing** هو تحويل كلمة المرور إلى سلسلة نصية معقدة وغير قابلة للاسترداد (One-way process).

### 🔹 ليه؟
إذا حدث اختراق لقاعدة البيانات، لن يستطيع المخترق معرفة كلمات المرور الحقيقية للمستخدمين.

### 🔹 إزاي بنستخدمه؟ (Bcrypt)
المكتبة الأشهر في Node.js هي `bcrypt`.

**مثال للتشفير عند التسجيل:**
```javascript
const bcrypt = require('bcrypt');

async function register(password) {
    const saltRounds = 10; // قوة التشفير
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Hashed Password:", hashedPassword);
    // احفظ hashedPassword في قاعدة البيانات
}
```

**مثال للمقارنة عند تسجيل الدخول:**
```javascript
async function login(plainPassword, hashedPasswordFromDB) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPasswordFromDB);
    if (isMatch) {
        console.log("Login Successful!");
    } else {
        console.log("Invalid Credentials");
    }
}
```

---

## 6.4 رموز الوصول (JWT - JSON Web Tokens)

### 🔹 يعني إيه؟
الـ **JWT** هو وسيلة آمنة لنقل المعلومات بين العميل (Frontend) والسيرفر (Backend) ككائن JSON. يتم توقيع هذا الرمز رقمياً بحيث لا يمكن تزويره.

يتكون من 3 أجزاء: `Header.Payload.Signature`

### 🔹 ليه بنستخدمه؟
لأنه **Stateless**. يعني السيرفر مش محتاج يخزن Session في قاعدة البيانات أو الذاكرة لكل مستخدم. التوكن نفسه يحتوي على كل المعلومات اللازمة للتعرف على المستخدم.

### 🔹 إزاي؟
بنستخدم مكتبة `jsonwebtoken`.

**إنشاء التوكن (Sign):**
```javascript
const jwt = require('jsonwebtoken');

const token = jwt.sign(
    { userId: '123', role: 'admin' }, // الـ Payload
    'SECRET_KEY',                      // مفتاح سري
    { expiresIn: '1h' }               // مدة الصلاحية
);
```

**التحقق من التوكن (Verify):**
```javascript
try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    console.log("User Data:", decoded);
} catch (error) {
    console.log("Invalid Token");
}
```

---

## 6.5 تجديد الرموز (Refresh Tokens)

### 🔹 يعني إيه؟
الـ **Access Token** عادة ما تكون مدته قصيرة (مثلاً 15 دقيقة) للأمان. الـ **Refresh Token** هو توكن مدته طويلة (أيام أو أسابيع) يُستخدم للحصول على Access Token جديد دون الحاجة لإدخال الباسورد مرة أخرى.

### 🔹 ليه؟
*   **زيادة الأمان:** إذا سُرق الـ Access Token، سينتهي مفعوله سريعاً.
*   **تجربة مستخدم أفضل:** المستخدم مش هيحتاج يعمل Login كل شوية.

### 🔹 إزاي؟
1.  عند تسجيل الدخول، السيرفر بيرسل Access Token و Refresh Token.
2.  الـ Access Token بيتحط في الـ Headers لكل طلب.
3.  لما ينتهي، الـ Frontend بيبعت الـ Refresh Token للسيرفر لطلب توكن جديد.

---

## 6.6 حماية المسارات (Protected Routes)

### 🔹 يعني إيه؟
هي مسارات (Endpoints) لا يمكن الوصول إليها إلا إذا كان المستخدم مسجلاً للدخول (لديه توكن صحيح).

### 🔹 إزاي؟ (Middleware)
بنعمل Middleware بيشوف التوكن موجود في الـ Header ولا لأ.

```javascript
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) return res.status(401).send("Access Denied");

    try {
        const verified = jwt.verify(token, 'SECRET_KEY');
        req.user = verified; // بنحفظ بيانات المستخدم في الطلب
        next(); // كمل للمسار اللي بعده
    } catch (err) {
        res.status(400).send("Invalid Token");
    }
};

// استخدام الميدل وير
app.get('/api/profile', authMiddleware, (req, res) => {
    res.send(`Welcome User ${req.user.userId}`);
});
```

---

## 6.7 الأدوار والصلاحيات (Roles)

### 🔹 يعني إيه؟
تقسيم المستخدمين لمجموعات (User, Admin, Editor) وكل مجموعة ليها صلاحيات مختلفة.

### 🔹 إزاي؟
تعديل الميدل وير ليتحقق من الـ Role الموجود داخل التوكن.

```javascript
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send("Forbidden: You don't have permission");
        }
        next();
    };
};

app.delete('/api/users/:id', authMiddleware, checkRole('admin'), (req, res) => {
    // الكود ده مش هيشتغل إلا لو المستخدم Admin
});
```

---

## 6.8 الكوكيز (Cookies)

### 🔹 يعني إيه؟
هي ملفات نصية صغيرة يخزنها المتصفح بطلب من السيرفر. يمكن استخدامها لتخزين التوكنز بدلاً من الـ LocalStorage.

### 🔹 ليه بنستخدمها مع الـ JWT؟
تخزين التوكن في **HttpOnly Cookie** يحميه من هجمات الـ **XSS (Cross-Site Scripting)** لأن كود الـ JavaScript في المتصفح لا يستطيع الوصول للكوكيز من هذا النوع.

### 🔹 إزاي؟
```javascript
res.cookie('token', token, {
    httpOnly: true,
    secure: true, // فقط عبر HTTPS
    maxAge: 3600000 // ساعة
});
```

---

## 6.9 Best Practices (أفضل الممارسات)

1.  **أمان الباسورد:** استخدم `saltRounds` مناسب (10-12) ولا تستخدم خوارزميات قديمة مثل MD5 أو SHA1.
2.  **أمان التوكن:** لا تضع بيانات حساسة (مثل الباسورد) داخل الـ JWT Payload.
3.  **HTTPS:** لا ترسل بيانات الدخول أو التوكنز أبداً عبر اتصال غير مشفر (HTTP).
4.  **Expire Time:** اجعل مدة صلاحية الـ Access Token قصيرة قدر الإمكان.
5.  **Validation:** تحقق دائماً من صحة البيانات القادمة من المستخدم (Validation) قبل معالجتها.

---

## 6.10 أسئلة Interview

**س1: ما الفرق بين Session-based و Token-based Authentication؟**
*   **الإجابة:** الـ Session تعتمد على تخزين حالة المستخدم في السيرفر (Stateful)، بينما الـ Token (مثل JWT) تعتمد على أن التوكن نفسه يحمل البيانات ولا يحتاج السيرفر لتخزين شيء (Stateless).

**س2: لماذا نستخدم HttpOnly Cookie لتخزين التوكن؟**
*   **الإجابة:** لمنع هجمات XSS، حيث لا يمكن لأي كود JavaScript خبيث أن يقرأ التوكن من الكوكيز إذا كانت HttpOnly.

---

## 6.11 تمارين للتأكد من فهمك

1.  **تمرين 1:** قم بإنشاء API بسيط للتسجيل (Register) يقوم بتشفير الباسورد باستخدام `bcrypt` وحفظه في مصفوفة (Array) مؤقتة.
2.  **تمرين 2:** قم بعمل Middleware يقوم بالتحقق من وجود `token` في الـ `headers` ويمنع الوصول للمسار إذا كان التوكن غير موجود.
3.  **تمرين 3:** (متقدم) حاول تنفيذ نظام الـ Refresh Token بحيث يتم تجديد الـ Access Token تلقائياً عند انتهائه.



# الفصل السابع: تقنيات Backend متقدمة (Advanced Backend)

---

## 1. Multer (File Upload)
### يعني إيه؟
Middleware لـ Node.js لمعالجة `multipart/form-data` لرفع الملفات.
### ليه؟
الخوادم لا تستطيع استقبال الملفات مباشرة كـ JSON.
### إزاي؟
```javascript
const upload = multer({ dest: 'uploads/' });
app.post('/upload', upload.single('avatar'), ...);
```

---

## 2. jSend Specification
### يعني إيه؟
معيار لتنسيق ردود JSON بشكل موحد (`status`, `data`, `message`).
### ليه؟
توحيد الردود يسهل التعامل معها من الـ Frontend.

---

## 3. WebSockets & Socket.IO
### يعني إيه؟
اتصال ثنائي الاتجاه Real-time.
### ليه؟
تطبيقات الدردشة والإشعارات الفورية.

---

### أفضل الممارسات:
- تأمين رفع الملفات (أنواع وأحجام).
- استخدام Rate Limiting لمنع الهجمات.
- استخدام Winston للـ Logging المنظم.



# الفصل الثامن: النشر والإنتاج (Deployment & Production)

---

## 1. ضبط البيئة (Environment Configuration)

### 🔹 يعني إيه؟
هي عملية فصل إعدادات التطبيق (مثل كلمات مرور قاعدة البيانات، مفاتيح API) عن الكود البرمجي، بحيث تختلف هذه الإعدادات باختلاف البيئة (Development, Staging, Production).

### 🔹 ليه بنستخدمه؟
* **الأمان:** لمنع تسريب بيانات حساسة في Git.
* **المرونة:** لتشغيل التطبيق في بيئات مختلفة دون تغيير الكود.

### 🔹 إزاي؟
لا تعتمد على `.env` في الإنتاج بشكل مباشر. استخدم متغيرات النظام (System Environment Variables) التي يوفرها السيرفر أو خدمة الاستضافة.

### Best Practices
- استخدم مكتبة `dotenv` فقط في التطوير.
- في الإنتاج (Production)، قم بضبط المتغيرات عبر لوحة تحكم الاستضافة (مثل Docker, Heroku, AWS).

---

## 2. إدارة العمليات (Process Management - PM2)

### 🔹 يعني إيه؟
في الإنتاج، إذا تعطل التطبيق، لا يجب أن يظل متوقفاً. **PM2** هو مدير عمليات (Process Manager) يضمن بقاء تطبيق Node.js يعمل للأبد.

### 🔹 ليه؟
- إعادة تشغيل تلقائي عند التعطل (Auto-restart).
- توزيع الحمل (Load Balancing) عبر تشغيل عدة نسخ من التطبيق (Cluster Mode).

### 🔹 مثال:
```bash
# تشغيل التطبيق عبر PM2
pm2 start app.js -i max
# مراقبة الحالة
pm2 monit
```

---

## 3. هندسة الإنتاج (Production Architecture)

### 🔹 يعني إيه؟
هيكل خادم الإنتاج. Node.js لا يجب أن يستقبل طلبات المستخدمين مباشرة دائماً.

### 🔹 ليه؟
- **Nginx:** يعمل كـ Reverse Proxy أمام Node.js لتحسين الأداء (تخزين مؤقت، أمان، معالجة SSL/HTTPS).

### 🔹 الهيكل المقترح:
`Internet` -> `Nginx` (HTTPS) -> `PM2/Node.js` -> `MongoDB`

---

## 4. الحاويات (Docker)

### 🔹 يعني إيه؟
تغليف تطبيقك بكل اعتماداته (Dependencies) في "حاوية" واحدة تعمل بنفس الطريقة على أي جهاز.

### 🔹 ليه؟
تجنب مشكلة "يعمل على جهازي ولكن لا يعمل على السيرفر" (It works on my machine).

### 🔹 إزاي (مثال Dockerfile):
```dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "app.js"]
```

---

## 5. خط أنابيب النشر (CI/CD)

### 🔹 يعني إيه؟
أتمتة (Automation) عملية الاختبار والنشر. بمجرد رفع الكود إلى GitHub، يتم تشغيل الاختبارات، وإذا نجحت، يتم تحديث السيرفر تلقائياً.

---

## 6. الاختبار والأداء (Testing & Performance)

### 🔹 الأداء:
- استخدم أداة `clinic.js` أو `0x` لتحليل أداء التطبيق واكتشاف أماكن بطء الكود.
- راقب استهلاك الذاكرة (Memory Leaks).

### 🔹 الاختبار (Testing):
- **Unit Tests:** اختبار الدوال الصغيرة (Jest).
- **Integration Tests:** اختبار API بالكامل مع قاعدة بيانات تجريبية.

---

### 🔹 أسئلة Interview
**س: ما الفرق بين التطوير (Development) والإنتاج (Production) من حيث الـ Node.js؟**
*   **الإجابة:** في التطوير نهتم بالسرعة وتصحيح الأخطاء (Logging, Hot-reload). في الإنتاج نهتم بالأمان (Security Headers, HTTPS)، الأداء (Caching, Cluster Mode)، الاستقرار (Process Management).

---

### 🔹 تمارين
1. أنشئ ملف `docker-compose.yml` يجمع بين تطبيق Node.js الخاص بك وقاعدة بيانات MongoDB.
2. قم بتثبيت PM2 على جهازك وجرب إيقاف التطبيق قسراً (Kill) وشاهد كيف يعيد تشغيل نفسه.



# الفصل التاسع: مشاريع عملية (Practical Projects)

---

## مقدمة
في هذا الفصل، سنركز على التطبيق العملي لبناء تطبيقات كاملة. الهدف هو فهم دورة حياة تطوير البرمجيات (SDLC).

## المشاريع:

### 1. تطبيق مدير مهام (CLI App)
*   **الهدف:** استخدام Node.js خارج المتصفح لبناء أداة سطر أوامر.
*   **التقنيات:** `commander` أو `yargs`.

### 2. واجهة برمجة تطبيقات (Complete REST API)
*   **الهدف:** بناء نظام متكامل لإدارة الموارد (CRUD).
*   **التقنيات:** `Express`, `Mongoose`.

### 3. نظام توثيق وصلاحيات (Authentication System)
*   **الهدف:** تأمين التطبيق بالكامل.
*   **التقنيات:** `JWT`, `bcrypt`, `express-rate-limit`.

### 4. منصة تجارة إلكترونية (E-commerce Backend)
*   **الهدف:** التعامل مع نماذج البيانات المعقدة (Users, Products, Orders).
*   **التقنيات:** `Aggregation`, `Populate`, `Pagination`.

### 5. تطبيق دردشة فوري (Real-Time Chat)
*   **الهدف:** التعامل مع الاتصال ثنائي الاتجاه.
*   **التقنيات:** `Socket.IO`.

---
**نصيحة:** ابدأ بتخطيط قاعدة البيانات (Database Design) قبل كتابة كود الـ API.



# الفصل العاشر: التحضير المهني (Professional Preparation)

---

## 10.1 أسئلة المقابلات (Interview Questions)

### 🔹 أسئلة عامة (General Knowledge)
* **ما هو الـ Event Loop؟** 
  هو المسؤول عن جعل Node.js يعمل بشكل غير متزامن (Asynchronous) رغم كونه Single-threaded، حيث يقوم بإدارة تنفيذ المهام (Callbacks) بعد انتهاء عمليات الـ I/O.
* **الفرق بين `setImmediate` و `process.nextTick`؟**
  `process.nextTick` يتم تنفيذه فوراً بعد انتهاء العملية الحالية وقبل أي شيء آخر، بينما `setImmediate` يتم تنفيذه في مرحلة الـ Check في الـ Event Loop.
* **ما هو الـ Middleware في Express؟**
  هي دوال لها صلاحية الوصول لـ `req` و `res` و `next`، وتستخدم للقيام بعمليات مثل التحقق من الصلاحيات (Authentication)، تسجيل الطلبات (Logging)، أو معالجة البيانات قبل وصولها للـ Route handler.

### 🔹 أسئلة تقنية (Technical Questions)
* **كيف تتعامل مع الأخطاء (Error Handling) في Node.js؟**
  استخدام `try-catch` مع async/await، أو استخدام Global error handler middleware في Express، أو التعامل مع `uncaughtException` و `unhandledRejection` (بحذر).
* **كيف تحسن أداء تطبيق Node.js؟**
  استخدام الـ Caching (مثل Redis)، استخدام تقنيات الـ Clustering، تحسين الاستعلامات في قاعدة البيانات، استخدام الـ Compression، ومراقبة الـ CPU والـ Memory.

---

## 10.2 الكود النظيف (Clean Code)

الكود النظيف هو كود سهل القراءة، سهل الفهم، وسهل الصيانة.

### 🔹 مبادئ أساسية
* **تسمية ذات معنى (Meaningful Names):** اسم المتغير يجب أن يعبر عن وظيفته (مثلاً `userData` بدل `data`).
* **دالة بوظيفة واحدة (Single Responsibility Principle - SRP):** الدالة يجب أن تقوم بشيء واحد فقط.
* **تجنب التكرار (DRY - Don't Repeat Yourself):** لا تكرر الكود، استخدم الدوال والمكتبات.
* **تعليقات واضحة (Clear Comments):** لا تعلق على الكود إذا كان واضحاً، استخدم التعليقات لتوضيح "لماذا" وليس "ماذا".

---

## 10.3 أنماط التصميم (Design Patterns)

هي حلول معيارية للمشاكل المتكررة في هندسة البرمجيات.

* **Singleton Pattern:** التأكد من وجود نسخة واحدة فقط من الكائن (مثل الاتصال بقاعدة البيانات).
* **Factory Pattern:** إنشاء كائنات دون تحديد الكلاس بالضبط.
* **Observer Pattern:** نظام إشعارات حيث يقوم كائن (Subject) بإبلاغ كائنات أخرى (Observers) عند حدوث تغيرات.
* **Middleware Pattern (في Express):** تسلسل من العمليات يتم تمرير الطلب خلالها.

---

## 10.4 Git و GitHub

أدوات لا غنى عنها لأي مطور.

### 🔹 مفاهيم أساسية
* **Repository (Repo):** مجلد المشروع الذي يتم تتبع تاريخ تغييراته.
* **Commit:** حفظ التغييرات الحالية في التاريخ.
* **Branch:** نسخة فرعية للعمل على ميزة جديدة دون التأثير على الكود الرئيسي (Main).
* **Pull Request (PR):** طلب لدمج تغييراتك في الفرع الرئيسي.
* **Merge:** دمج فرع في آخر.

### 🔹 سير العمل المعتاد
1. `git pull` (تحديث محلي من السيرفر).
2. `git checkout -b feature-branch` (إنشاء فرع جديد).
3. `git add .` ثم `git commit -m "message"` (حفظ التغييرات).
4. `git push origin feature-branch` (رفع الفرع).
5. إنشاء PR على GitHub.

---

## 10.5 خارطة الطريق للباك إند (Backend Roadmap)

1. **لغة البرمجة:** إتقان JavaScript/TypeScript.
2. **Node.js:** فهم الـ Runtime والـ Core Modules.
3. **Frameworks:** التعمق في Express.js أو NestJS.
4. **قواعد البيانات:** SQL (PostgreSQL, MySQL) و NoSQL (MongoDB).
5. **Authentication:** JWT, OAuth2, Session-based auth.
6. **Testing:** Unit Testing (Jest), Integration Testing.
7. **Deployment:** Docker, CI/CD, Cloud Providers (AWS/DigitalOcean).
8. **Security:** فهم مبادئ أمن الويب (OWASP).

---

## 10.6 تمارين (Assignments)

1. **تمرين Git:** أنشئ مستودعاً جديداً على GitHub، وارفع عليه مشروعك السابق، وأنشئ branch جديد باسم `dev` وقم بعمل تغييرات ثم ادمجها في `main`.
2. **تمرين Clean Code:** راجع كود أحد مشاريعك السابقة، قم بإعادة تسمية المتغيرات غير الواضحة، وقسم الدوال الطويلة إلى دوال أصغر.
3. **تمرين بحث:** ابحث عن الفرق بين `JWT` و `Session-based authentication` واكتب ملخصاً في ملف markdown داخل مشروعك.



