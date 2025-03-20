document.addEventListener("DOMContentLoaded", () => {
    let counter = document.getElementById("counter");
    let plusBtn = document.getElementById("plus");
    let minusBtn = document.getElementById("minus");
    let heartBtn = document.getElementById("heart");
    let pauseBtn = document.getElementById("pause");
    let commentForm = document.getElementById("comment-form");
    let commentList = document.getElementById("list");
    let likesList = document.querySelector(".likes");

    let count = 0;
    let isPaused = false;
    let likes = {};
    function updateCounter() {
        counter.innerText = count;
    }
    let interval = setInterval(() => {
        if (!isPaused) {
            count++;
            updateCounter();
        }
    }, 1000);
    plusBtn.addEventListener("click", () => {
        count++;
        updateCounter();
    });

    minusBtn.addEventListener("click", () => {
        count--;
        updateCounter();
    });

    heartBtn.addEventListener("click", () => {
        if (!likes[count]) {
            likes[count] = 1;
            let li = document.createElement("li");
            li.id = `like-${count}`;
            li.innerText = `${count} has been liked 1 time`;
            likesList.appendChild(li);
        } else {
            likes[count]++;
            let li = document.getElementById(`like-${count}`);
            li.innerText = `${count} has been liked ${likes[count]} times`;
        }
    });

    pauseBtn.addEventListener("click", () => {
        isPaused = !isPaused;
        pauseBtn.innerText = isPaused ? "resume" : "pause";
        [plusBtn, minusBtn, heartBtn, commentForm.querySelector("button")].forEach(btn => {
            btn.disabled = isPaused;
        });
    });

    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let commentInput = commentForm.comment.value.trim();
        if (commentInput) {
            let p = document.createElement("p");
            p.innerText = commentInput;
            commentList.appendChild(p);
            commentForm.comment.value = "";
        }
    });
});
