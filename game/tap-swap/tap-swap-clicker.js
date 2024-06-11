const energyThreshold = 25;
let checkAttempts = 0;
let isLoading;

function generateRandomCoor(radius) {
  let x, y;
  do {
    x = Math.random() * 2 - 1;
    y = Math.random() * 2 - 1;
  } while (x * x + y * y > 1);
  return {
    x: Math.round(x * radius),
    y: Math.round(y * radius),
  };
}

function getTapEnergy() {
  const energyElement = document.querySelector(
    "div._value_tzq8x_13 h4._h4_1w1my_1"
  );
  if (energyElement) {
    return parseInt(energyElement.textContent);
  }
  return null;
}

function tap() {
  const button = document.querySelector("#ex1-layer img");
  const loading = document.querySelector("[class*='_loadingContent']");

  if (loading) {
    console.log(
      "%c[Tap-Swap-Clicker] - Game is still loading.",
      "background: #8774E1; color: #fff; padding: 5px;"
    );
    isLoading = true;
    attemp();
  } else {
    isLoading = false;
    if (button) {
      console.log(
        "%c[Tap-Swap-Clicker] - Coin found. Performing click.",
        "background: #8774E1; color: #fff; padding: 5px;"
      );
      clickButton();
    } else {
      attemp();
    }
  }
}

function attemp() {
  checkAttempts++;
  if (checkAttempts >= 10) {
    if (isLoading) {
      console.log(
        `%c[Tap-Swap-Clicker] - Game still loading after 10 attempts. Reloading page.`,
        "background: #8774E1; color: #fff; padding: 5px;"
      );
    } else {
      console.log(
        "%c[Tap-Swap-Clicker] - Coin not found after 5 attempts. Reloading page.",
        "background: #8774E1; color: #fff; padding: 5px;"
      );
    }
    location.reload();
  } else {
    if (isLoading) {
      console.log(
        `%c[Tap-Swap-Clicker] - Waiting for loading ${checkAttempts}/${10} Retrying in 3 seconds`,
        "background: #8774E1; color: #fff; padding: 5px;"
      );
    } else {
      console.log(
        `%c[Tap-Swap-Clicker] - Coin not found. Attempt ${checkAttempts}/${10}. Retrying in 3 seconds.`,
        "background: #8774E1; color: #fff; padding: 5px;"
      );
    }
    setTimeout(tap, 3000);
  }
}

function triggerEvent(element, eventType, properties) {
  const event = new MouseEvent(eventType, properties);
  element.dispatchEvent(event);
}

function clickButton() {
  const currentEnergy = getTapEnergy();
  if (currentEnergy !== null && currentEnergy < energyThreshold) {
    const pauseTime = 60000 + Math.random() * (300000 - 60000);
    console.log(
      `%c[Tap-Swap-Clicker] - Energy below ${energyThreshold}. Pausing for ${Math.round(
        pauseTime / 1000
      )} seconds.`,
      "background: #8774E1; color: #fff; padding: 5px;"
    );
    setTimeout(clickButton, pauseTime);
    return;
  }

  const button = document.querySelector("#ex1-layer img");

  if (button) {
    const rect = button.getBoundingClientRect();
    const radius = Math.min(rect.width, rect.height) / 2;
    const { x, y } = generateRandomCoor(radius);

    const clientX = rect.left + radius + x;
    const clientY = rect.top + radius + y;

    const commonProperties = {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: clientX,
      clientY: clientY,
      screenX: clientX,
      screenY: clientY,
      pageX: clientX,
      pageY: clientY,
      pointerId: 1,
      pointerType: "touch",
      isPrimary: true,
      width: 1,
      height: 1,
      pressure: 0.5,
      button: 0,
      buttons: 1,
    };

    triggerEvent(button, "pointerdown", commonProperties);
    triggerEvent(button, "mousedown", commonProperties);
    triggerEvent(button, "pointerup", { ...commonProperties, pressure: 0 });
    triggerEvent(button, "mouseup", commonProperties);
    triggerEvent(button, "click", commonProperties);

    const delay = 30 + Math.random() * (50 - 30);
    setTimeout(tap, delay);
  } else {
    console.log(
      "%c[Tap-Swap-Clicker] - Button not found!",
      "background: #8774E1; color: #fff; padding: 5px;"
    );
  }
}

tap();
