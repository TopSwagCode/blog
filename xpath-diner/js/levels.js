var levels = [
    {
      helpTitle : "Select elements by their type",
      selectorName : "Type Selector",
      doThis : "Select the plates",
      selector : "//plate",
      syntax : "//A",
      help : "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
      examples : [
        '<strong>//div</strong> selects all <tag>div</tag> elements.',
        '<strong>//p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: `
        <plate/>
        <plate/>
        `
    },
    {
      doThis : "Select the bento boxes",
      selector : "//bento",
      syntax : "//A",
      helpTitle : "Select elements by their type",
      selectorName : "Type Selector",
      help : "Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.",
      examples : [
        '<strong>//div</strong> will select all <tag>div</tag> elements.',
        '<strong>//p</strong> will select all <tag>p</tag> elements.',
        ],
        boardMarkup: `
        <bento/>
        <plate/>
        <bento/>
        `
    },
    {
      doThis : "Select the apple on a plate",
      selector : "//plate/apple",
      syntax : "//A/B",
      helpTitle : "Select element by their absolute path",
      selectorName : "Absolute Path Selector",
      help : "Selects all elements of type <strong>B</strong> with Parent <strong>A</strong>.",
      examples : [
        '<strong>//div/a</strong> will select all <tag>a</tag> elements. within a <tag>div</tag>.'
        ],
        boardMarkup: `
        <bento><apple/></bento>
        <plate><apple/></plate>
        <apple/>
        `
    },
    {
      doThis : "Select all elements",
      selector : "//*",
      syntax : "//*",
      helpTitle : "Select elements by using relative path",
      selectorName : "Relative Selector",
      help : "Selects all elements in relative path. Eg. //* selects all elements on a page.",
      examples : [
        '<strong>//*</strong> will select all elements.'
        ],
        boardMarkup: `
        <bento/>
        <plate/>
        <bento/>
        `
    },
    {
      doThis : "Select all apples on any other element",
      selector : "//*/apple",
      syntax : "//*/A",
      helpTitle : "Select elements by using relative path",
      selectorName : "Relative Selector",
      help : "Selects all elements in relative path. Eg. //*/div selects all elements on a page which are divs and have a parent.",
      examples : [
        '<strong>//*/div</strong> will select all div elements with atleast one parent element'
        ],
        boardMarkup: `
        <apple/>
        <plate><apple/></plate>
        <bento><apple/></bento>
        `
    },
    {
      doThis : "Select the fancy plate",
      selector : "//*[@id='fancy']",
      selectorName: "Attribute Selector",
      helpTitle: "Select elements with an Attribute",
      syntax: "//*[@id='Element ID']",
      help : 'Selects the element with the <strong>id</strong> attribute. You can also combine the ID selector with the type selector. Works on all attributes E.g. <strong>class</strong>, <strong>name</strong>, <strong>placeholder</strong>',
      examples : [
        '<strong>//*[@id="Element ID"]</strong> will select any element with <strong>id="cool"</strong>',
        '<strong>//ul[@id="long"]</strong> will select <strong>&lt;ul id="long"&gt;</strong>'
      ],
      boardMarkup : `
      <plate id="fancy"/>
      <plate/>
      <bento/>
      `
    },
    {
      helpTitle: "Select an element inside another element",
      selectorName : "Descendant Selector",
      doThis : "Select the apple on the plate",
      selector : "//plate/apple",
      syntax: "//A/B",
  
      help : "Selects all <strong>B</strong> inside of <strong>A</strong>. Here <strong>B</strong> is the descendant element, meaning an element that is inside of another element.",
      examples : [
        '<strong>//p/strong</strong> will select all <strong>&lt;strong&gt;</strong> that are descendants of any <strong>&lt;p&gt;</strong>',
        '<strong>//*[@id="fancy"]/span</strong> will select any <strong>&lt;span&gt;</strong> that is a descendant of any element with  <strong>id="fancy"</strong>',
      ],
      boardMarkup : `
      <bento/>
      <plate>
        <apple/>
      </plate>
      <apple/>
      `
    },
    {
      doThis : "Select the pickle on the fancy plate",
      selector : "//*[@id='fancy']/pickle",
      helpTitle: "Combine the Descendant & ID Selectors",
      syntax: "//*[@id='id']/A",
      help : 'You can combine any selector with the descendent selector.',
      examples : [
        '<strong>//*[@id="cool"]/span</strong> will select all <strong>&lt;span&gt;</strong> elements that are inside of elements with <strong>id="cool"</strong>'
      ],
      boardMarkup : `
      <bento>
      <orange/>
      </bento>
      <plate id="fancy">
        <pickle/>
      </plate>
      <plate>
        <pickle/>
      </plate>
      `
    },
    {
      doThis : "Select the small apples",
      selector : "//*[contains(@class,'small')]",
      selectorName: "Class Selector",
      helpTitle: "Select elements by their class",
      syntax: "//*[contains(@Attribute,'value')]",
      help : 'The contains selector selects all elements with that attribute which contains given value. Elements can only have one ID, but may contain many classes.',
      examples : [
      '<strong>//*[contains(@class,"neato")]</strong> selects all elements with <strong>class="neato"</strong>'
      ],
      boardMarkup : `
      <apple/>
      <apple class="small"/>
      <apple/>
      <apple class="small"/>
      `
    },
    {
      doThis : "Select the small oranges",
      selector : "//orange[contains(@class,'small')]",
      helpTitle: "More specific Attribute Selector",
      syntax: "//A[contains(@Attribute,'value')]",
      help : 'You can be more specific with Selectors.',
      examples : [
        '<strong>//ul[contains(@class,"important")]</strong> will select all <strong>&lt;ul&gt;</strong> elements that have <strong>class="important stuff"</strong>',
        '<strong>//input[@placeholder="Name"]</strong> will select all elements with <strong>&lt;input&gt;</strong> that have <strong>placeholder="Name"</strong>'
      ],
      boardMarkup :`
      <apple/>
      <apple class="small"/>
      <orange class="small"/>
      <orange/>
      <orange class="small"/>
      `
    },
    {
      doThis : "Select the small oranges in the bentos",
      selector : "//bento/orange[contains(@class,'small')]",
      syntax: "Put your back into it!",
      helpTitle: "You can do it...",
      help : 'Combine what you learned in the last few levels to solve this one!',
      boardMarkup : `
      <bento>
        <orange/>
      </bento>
      <orange class="small"/>
      <bento>
        <orange class="small"/>
      </bento>
      <bento>
        <apple class="small"/>
      </bento>
      <bento>
        <orange class="small"/>
      </bento>
      `
    },
    {
      doThis : "Select all the plates and bentos",
  
      selector : "//plate|//bento",
      selectorName : "| Combinator",
      helpTitle: "Combine, selectors, with... |!",
      syntax : "//A|//B",
      help : '<strong>//A</strong> | <strong>//B</strong> elements. You can combine any selectors this way, and you can specify more than two.',
      examples: [
      '<strong>//p| //*[@id="fun"]</strong> will select all <tag>p</tag> elements as well as all elements with <strong>id="fun"</strong>',
      '<strong>//a|//p|//div</strong> will select all <tag>a</tag>, <tag>p</tag> and <tag>div</tag> elements'
      ],
      boardMarkup : `
      <pickle class="small"/>
      <pickle/>
      <plate>
        <pickle/>
      </plate>
      <bento>
        <pickle/>
      </bento>
      <plate>
        <pickle/>
      </plate>
      <pickle/>
      <pickle class="small"/>
      `
    },
    {
      doThis : "Select everything on a plate",
      selector : "//plate/*",
      syntax : "//A/*",
      helpTitle: "Universal Selector",
      help : 'This will select all elements inside of <strong>A</strong>.',
      examples : [
        '<strong>//p/*</strong> will select every element inside all <strong>&lt;p&gt;</strong> elements.',
        '<strong>//ul[@id="fancy"]/*</strong> will select every element inside all <strong>&lt;ul id="fancy"&gt;</strong> elements.'
      ],
      boardMarkup : `
      <apple/>
      <plate>
        <orange class="small" />
      </plate>
      <bento/>
      <bento>
        <orange/>
      </bento>
      <plate id="fancy"> 
        <apple/>
      </plate>
      `
    },
    {
      doThis : "Select every apple that's next to a plate",
      selector : "//plate/following-sibling::apple",
      helpTitle: "Select an element that directly follows another element",
      selectorName: "Adjacent Sibling Selector",
      syntax : "//A/following-sibling::B",
      help : "This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",
      examples : [
        '<strong>//p/following-sibling::div</strong> will select every element with <strong>&lt;div&gt;</strong> that directly follows a <tag>p</tag>',
        '<strong>//div//following-sibling::a</strong> will select every <tag>a</tag> element that directly follows a <tag>div</tag>'
      ],
      boardMarkup: `
      <apple class="small"/>
      <plate>
        <pickle/>
      </plate>
      <apple class="small"/>
      <plate>
        <apple/>
      </plate>`
    },
    {
      doThis : "Select every pickle prior to the plate",
      selector : "//plate/preceding-sibling::pickle",
      helpTitle: "Select an element that directly prior to another element",
      selectorName: "Adjacent Sibling Selector",
      syntax : "//A/preceding-sibling::B",
      help : "This selects all <strong>B</strong> elements that directly precends <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",
      examples : [
        '<strong>//p/preceding-sibling::div</strong> will select every element with <strong>&lt;div&gt;</strong> that directly precends a <tag>p</tag>'
      ],
      boardMarkup: `
      <pickle/>
      <pickle/>
      <plate>
        <pickle/>
      </plate>
      <pickle/>
      <pickle/>`
    },
    {
      selectorName: "Index Selector",
      helpTitle: "Select element at given index",
      syntax: "(A)[Index]",
      doThis : "Select the third pickle",
      selector : "(//pickle)[3]",
      help : "You can select a specific element given within a xpath result.",
      examples : [
        '<strong>(//a)[2]</strong> will select second <strong>A</strong>'
      ],
      boardMarkup : `
      <pickle/>
      <bento>
        <pickle class="small"/>
      </bento>  
      <pickle class="small">
      </pickle>
      <bento>
        <pickle/>
      </bento>  
      <bento>
        <pickle class="small"/>
      </bento>  
      `
    },
    {
      selectorName: "Child Selector",
      syntax: "//A/B",
      doThis : "Select the apple directly on a plate",
      selector : "//plate/apple",
      helpTitle: "Select direct children of an element",
      help : "You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.",
      examples : [
        '<strong>A//B</strong> will select all <strong>B</strong> that are a direct children <strong>A</strong>'
      ],
      boardMarkup: `
      <plate>
        <bento>
          <apple/>
        </bento>
      </plate>
      <plate>
        <apple/>
      </plate>
      <plate/>
      <apple/>
      <apple class="small"/>
      `
    },
    {
      selectorName: "Last selector",
      helpTitle: "Select the last element inside of another element",
      doThis : "Select the small apple and the big orange",
      selector : "//plate/*[last()]",
      syntax: "last()",
      help : "You can use this selector to select an element that is the last child element inside of another element. <br><br>Pro Tip &rarr; In cases where there is only one element, that element counts as the first-child, only-child and last-child!",
      examples : [
        '<strong>(//div)[last()]</strong> selects the last <strong>&lt;div&gt;</strong> element.',
        '<strong>//div/*[last()]</strong> selects all the last elements within <strong>&lt;div&gt;</strong> elements.',
        ],
        boardMarkup : `
        <plate id="fancy">
          <apple class="small"/>
        </plate>
        <plate/>
        <plate>
          <orange class="small"/>
          <orange>
        </plate>
        <pickle class="small"/>`
    },
    {
      selectorName: "Last selector extra",
      helpTitle: "Select the last element inside of another element",
      doThis : "Select the last apple on each plate",
      selector : "//plate/apple[last()]",
      syntax: "//A[last()]",
      help : "You can use this selector to select an element that is the last child element inside of another element. <br><br>Pro Tip &rarr; In cases where there is only one element, that element counts as the first-child, only-child and last-child!",
      examples : [
        '<strong>(//div)[last()]</strong> selects the last <strong>&lt;div&gt;</strong> element.',
        '<strong>//div/*[last()]</strong> selects all the last elements within <strong>&lt;div&gt;</strong> elements.',
        ],
        boardMarkup : `
        <plate><apple class="small"/></plate>
        <plate><orange class="small"/><apple/></plate>
        <plate><apple class="small"/><apple/><orange/></plate>
        <plate><orange class="small"/><apple/></plate>
        <plate><apple class="small"/></plate>
        `
    },
    {
      selectorName: "Last - N selector",
      helpTitle: "Select the second last element inside of another element",
      doThis : "Select the second last apple on each plate",
      selector : "//plate/*[last()-1]",
      syntax: "//A[last()-N]",
      help : "You can use this selector to select an element that is the last - N child element inside of another element.",
      examples : [
        '<strong>(//div)[last()-3]</strong> selects the 4th last <strong>&lt;div&gt;</strong> element.'
        ],
        boardMarkup : `
        <plate><apple/><apple/><apple/><apple/></plate>
        `
    },
    {
      selectorName: "Attribute Selector",
      helpTitle: "Select all elements that have a specific attribute",
      doThis : "Select the items for someone",
      selector : "//*[@for]",
      syntax: "//*[@attribute]",
      help : 'Attributes appear inside the opening tag of an element, like this: <tag>span attribute="value"</tag>. An attribute does not always have a value, it can be blank!',
      examples : [
        '<strong>//a[@href]</strong> selects all <tag>a</tag> elements that have a <strong>href="anything"</strong> attribute.',
        '<strong>//*[@type]</strong> selects all elements that have a <strong>type="anything"</strong>. attribute'
      ],
      boardMarkup:`
      <bento><apple class="small"/></bento>
      <apple for="Ethan"/>
      <plate for="Alice"><pickle/></plate>
      <bento for="Clara"><orange/></bento>
      <pickle/>`
    },
    {
      selectorName: "Attribute Selector",
      helpTitle: "Select all elements that have a specific attribute",
      doThis : "Select the plates for someone",
      selector : "//plate[@for]",
      syntax: "//A[@attribute]",
      help : "Combine the attribute selector with another selector (like the tag name selector) by adding it to the end.",
      examples : [
        '<strong>//*[@value]</strong> selects all elements that have a <strong>value="anything"</strong> attribute.',
        '<strong>//a[@href]</strong> selects all <tag>a</tag> elements that have a <strong>href="anything"</strong> attribute.',
        '<strong>//input[@disabled]</strong> selects all <tag>input</tag> elements with the <strong>disabled</strong> attribute'
      ],
      boardMarkup:`
      <plate for="Sarah"><pickle/></plate>
      <plate for="Luke"><apple/></plate>
      <plate/>
      <bento for="Steve"><orange/></bento>
      `
    },
    {
      selectorName: "Attribute Value Selector",
      helpTitle: "Select all elements that have a specific attribute value",
      doThis : "Select Vitaly's meal",
      selector : "//*[@for='Vitaly']",
      syntax: "//*[@attribute='value']",
      help : "Attribute selectors are case sensitive, each character must match exactly.",
      examples : [
        '<strong>//input[@type="checkbox"]</strong> selects all checkbox input elements.'
      ],
      boardMarkup:`
      <apple for="Alexei" />
      <bento for="Albina"><apple /></bento>
      <bento for="Vitaly"><orange/></bento>
      <pickle/>
      `
    },
    {
      selectorName: "Multiple Attribute Value Selector",
      helpTitle: "Select all elements that have multiple specific attribute value",
      doThis : "Select Hanna's meal on the fancy plate",
      selector : "//plate[@for='Hanna' and @id='fancy']/apple",
      syntax: "//B[@attribute='value' and @otherAttribute='other value']/A",
      help : "Attribute selectors are case sensitive, each character must match exactly.",
      examples : [
        '<strong>//input[@type="text" and @placeholer="username"]</strong> selects all text input elements with placeholder username.'
      ],
      boardMarkup:`
      <plate id="fancy" for="Hanna"><apple/></plate>
      <plate for="Hanna"><apple/></plate>
      `
    },
    {
      selectorName: "Attribute Starts With Selector",
      helpTitle: "Select all elements with an attribute value that starts with specific characters",
      doThis : "Select the items for names that start with 'Sa'",
      selector : "//*[starts-with(@for,'Sa')]",
      syntax: '//*[starts-with(@attribute,"value")]',
      // help : "You can use quotes around the value in the selector, or not&mdash;it's optional!",
      examples : [
        '<strong>//toy[starts-with(@category,"Swim")]</strong> selects elements with class <strong>toy</strong> and <strong>category "Swimwear"</strong> '
      ],
      boardMarkup: `
      <plate for="Sam"><pickle/></plate>
      <bento for="Sarah"><apple class="small"/></bento>
      <bento for="Mary"><orange/></bento>
      `
    },
    {
      selectorName: "Attribute Ends With Selector",
      helpTitle: "Select all elements with an attribute value that ends with specific characters. The 'ends-with' function is part of xpath 2.0 but browsers generally only support 1.0",
      doThis : "Select the items for names that end with 'ato'",
      selector : "//*[substring(@for, string-length(@for) - string-length('ato') +1) = 'ato']",
      syntax: "//*[substring(@attribute, string-length(@attribute) - string-length('end text') +1) = 'end text']",
      help : '',
      examples : [
        "<strong>//img[substring(@src, string-length(@src) - string-length('.jpg')+1 ) '.jpg' ]</strong> selects all images display a <strong>.jpg</strong> image.",
      ],
      boardMarkup:`
      <apple class="small"/>
      <bento for="Hayato"><pickle/></bento>
      <apple for="Ryota"></apple>
      <plate for="Minato"><orange/></plate>
      <pickle class="small"/>
      `
    },
  ];