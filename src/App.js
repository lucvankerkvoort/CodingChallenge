import React from "react";
import "./styles.css";

export default class App extends React.Component {
  state = {
    jobs: 0,
    colors: ["#D16BA5", "#86A8E7", "#5FFBF1", "#00B8FF", "#A92873", "#A4F6A7"],
    count: 0
  };

  randomColorGenerator = () => {
    let randomNum = Math.floor(Math.random() * this.state.colors.length);
    let randomColor = this.state.colors[randomNum];

    return randomColor;
  };

  addJob = e => {
    e.preventDefault();

    const companyName = document.getElementById("companyname").value;
    const jobTitle = document.getElementById("jobtitle").value;

    let div = document.createElement("div");
    div.className = "joblisting";
    div.addEventListener("click", this.handleClick);

    div.style.background = this.randomColorGenerator();

    let button = document.createElement("button");
    button.className = "button help";
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", ".bd-removal-modal-sm");

    let h3 = document.createElement("h3");
    h3.textContent = companyName;

    let p = document.createElement("p");
    p.textContent = jobTitle;

    let br = document.createElement("br");
    div.append(h3, br, p, button);

    let target = document.getElementById("target");

    target.append(div);

    document.getElementById("companyname").value = "";
    document.getElementById("jobtitle").value = "";

    this.setState({ jobs: this.state.jobs + 1, count: this.state.count + 1 });
  };

  handleClick = e => {
    const element = e.target;
    console.log(element);

    // we are trying to make sure that the element we are clicking is the correct one.
    if (element.className === "joblisting") {
      let button = element.querySelector(".button");
      button.classList.toggle("help");

      this.setState({ element: element });
    }
  };

  remove = e => {
    let removableDiv = this.state.element;
    removableDiv.parentNode.removeChild(removableDiv);

    this.setState({ jobs: this.state.jobs - 1 });
  };
  render() {
    console.log(this.state.element ? this.state.element : null);
    return (
      <div className="App">
        <div className="col-md-4 text-center">
          <h2>WISHLIST</h2>
          <p>{this.state.jobs} JOBS</p>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            className="addJob"
            data-toggle="modal"
            data-target=".bd-example-modal-sm"
          >
            +
          </button>
        </div>

        <div
          className="modal fade bd-example-modal-sm"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <h2 className="modal-title">Add a Job</h2>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="companyname"
                    placeholder="Company Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="jobtitle"
                    placeholder="Job Title"
                  />
                </div>
                <button
                  id="continue"
                  data-dismiss="modal"
                  type="submit"
                  onClick={this.addJob}
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
        <div id="target" className="col-md-4" />
        <div
          className="modal fade bd-removal-modal-sm"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content">
              <p>Are you sure you want to remove this job listing</p>
              <button data-dismiss="modal" type="submit" onClick={this.remove}>
                Remove
              </button>
              <button data-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
