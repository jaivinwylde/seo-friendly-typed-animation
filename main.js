// Handle typed behavior
const type_speed = 150;
const type_break = 1300;

const type_classes = document.querySelectorAll(".type");

type_classes.forEach((type) => {
    const counter_object = {
        step: 0,
        previous_step: 0
    };

    type.textContent = "";
    const words = type.dataset.words.split(", ");

    const type_timeline = anime.timeline({
        targets: counter_object,
        easing: "linear",
        complete: () => {
            type.textContent = " ";
            type_timeline.play();
        }
    });

    for (let i = 0; i < words.length; i++) {
        type_timeline.add({
            step: words[i].length,
            duration: (words[i].length + 1) * type_speed,
            round: true,
            change: () => {
                if (counter_object.previous_step != counter_object.step) {
                    type.textContent += words[i][counter_object.step - 1];
                }

                counter_object.previous_step = counter_object.step;
            }
        }).add({
            duration: type_break,
            begin: () => {
                type.classList.add("blink");
            },
            complete: () => {
                type.classList.remove("blink");
            }
        }).add({
            step: 0,
            duration: (words[i].length + 1) * (type_speed / 2),
            round: true,
            change: () => {
                if (counter_object.previous_step != counter_object.step) {
                    type.textContent = type.textContent.slice(0, counter_object.step);
                }

                counter_object.previous_step = counter_object.step;
            }
        });
    }
});
