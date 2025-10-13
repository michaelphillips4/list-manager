


function App() {

  return (
    <>
    <h1>List Manager</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
       </p>
     
   <section>
        <h2>Form Elements</h2>

        <div className="stack">
        
            <label htmlFor="text">input type = text</label>
            <input type="text" id="text" required />

            <label htmlFor="tel">input type = tel</label>
            <input type="tel" id="tel" />

            <label htmlFor="email">input type = email</label>
            <input type="email" />

            <label htmlFor="url">input type = url</label>
            <input type="url" />

            <label htmlFor="password">input type = password</label>
            <input type="password" />

            <label htmlFor="number">input type = number</label>
            <input type="number" />
    
            <label htmlFor="date">input type = date</label>
            <input type="date" />

            <label htmlFor="datetime-local">input type = datetime-local</label>
            <input type="datetime-local" />

            <label htmlFor="month">input type = month</label>
            <input type="month" />

            <label htmlFor="time">input type = time</label>
            <input type="time" />

            <label htmlFor="select">select</label>
            <select id="select">
              <option>item one</option>
              <option>item two</option>
              <option>item three</option>
            </select>
   
            <label htmlFor="checkbox">input type = checkbox</label>

            <input type="checkbox" />

            <label htmlFor="radio">input type = radio</label>
 
                <input
                  id="radio1"
                  type="radio"
                  name="radio"
                  value="a"
                  data-bind="radio"
                />
            
                <input type="radio" name="radio" value="b" />
            
                <input type="radio" name="radio" value="c" />
       

            <label htmlFor="range">input type = range</label>
            <input type="range" />

            <label htmlFor="reset">input type = reset</label>
            <input type="reset" />

            <label htmlFor="textarea">textarea</label><br />
            <textarea rows={5}></textarea>

            <button>Text</button>
          </div>
      
      </section>




    </>
  )
}

export default App
