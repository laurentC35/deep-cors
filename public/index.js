let state = {};
const setState = (key, value) => {
  state = { ...state, [key]: value };
};

const DOM_ELEMENT = {
  inputUrl: document.querySelector("#inputUrl"),
  result: document.querySelector("#result"),
  fetchButton: document.querySelector("#fetching"),
  resetButton: document.querySelector("#reset"),
  example: document.querySelector("#example"),
};

const onReset = () => {
  DOM_ELEMENT.result.textContent = "";
  DOM_ELEMENT.inputUrl.value = "";
};

const onResult = (result, data) => {
  DOM_ELEMENT.result.textContent = `${result}\n${JSON.stringify(
    data,
    null,
    "\t"
  )}`;
};

const onClickFetch = async () => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  try {
    const response = await fetch(state.url, {
      headers: headers,
      method: "GET",
    });
    if (response?.ok) {
      try {
        const data = await response.json();
        onResult("Succes !", data);
      } catch (error) {
        onResult("Problème !");
      }
    } else {
      onResult("Problème !");
    }
  } catch (error) {
    onResult("Problème !");
  }
};

DOM_ELEMENT.inputUrl.addEventListener("change", function (event) {
  setState("url", event.currentTarget.value);
});
DOM_ELEMENT.fetchButton.addEventListener("click", function () {
  onClickFetch();
});
DOM_ELEMENT.resetButton.addEventListener("click", function () {
  onReset();
});

DOM_ELEMENT.example.textContent = `${window.location.origin}/static/questionnaire/simpsons/form.json`;
