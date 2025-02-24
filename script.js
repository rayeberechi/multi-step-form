document.addEventListener("DOMContentLoaded", () => {
    const steps = ["#info-step", "#step-plan", "#step-add", "#step-finale", ".tnks"];
    let currentStep = 0;

    function showStep(stepIndex) {
        document.querySelectorAll(".step-content").forEach(step => step.style.display = "none");
        document.querySelector(steps[stepIndex]).style.display = "grid";
    }

    showStep(currentStep);

    document.querySelectorAll(".step-no, .step a").forEach(stepLink => {
        stepLink.addEventListener("click", (event) => {
            event.preventDefault();
            const stepTarget = stepLink.closest(".steps").querySelector("a").getAttribute("href");
            currentStep = steps.findIndex(step => step === stepTarget);
            showStep(currentStep);
        });
    });

    document.querySelector("#form").addEventListener("submit", (event) => {
        event.preventDefault();
        const phoneInput = document.querySelector("#phone-no input");
        const errorMsg = document.querySelector("#phone-no #red");

        if (!phoneInput.value.trim()) {
            errorMsg.style.display = "inline";
        } else {
            errorMsg.style.display = "none";
            if (document.querySelector("#name").value.trim() === "" || document.querySelector("#email").value.trim() === "") {
                alert("All fields are required");
            } else {
                currentStep++;
                showStep(currentStep);
            }
        }
    });

    document.querySelectorAll(".back-click").forEach(button => {
        button.addEventListener("click", () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    document.querySelectorAll("#step-plan .plan-opt").forEach(plan => {
        plan.addEventListener("click", () => {
            document.querySelectorAll("#step-plan .plan-opt").forEach(p => p.style.border = "1px solid grey");
            plan.style.border = "3px solid black";
            plan.classList.add("selected-plan");
        });
    });

    document.querySelector(".duration").addEventListener("click", () => {
        const toggleIcon = document.querySelector(".duration i");
        toggleIcon.classList.toggle("fa-toggle-on");
        toggleIcon.classList.toggle("fa-toggle-off");
    });

    document.querySelector("#step-plan input[type='submit']").addEventListener("click", () => {
        if (document.querySelector(".selected-plan")) {
            currentStep++;
            showStep(currentStep);
        } else {
            alert("Please select a plan before proceeding.");
        }
    });

    document.querySelectorAll("#step-add .perks div").forEach(perk => {
        perk.addEventListener("click", () => {
            perk.classList.toggle("selected");
            perk.style.border = perk.classList.contains("selected") ? "3px solid black" : "1px solid grey";
            const icon = perk.querySelector("i");
            icon.classList.toggle("fa-square");
            icon.classList.toggle("fa-square-check");
        });
    });

    function updateSummary() {
        const selectedPlan = document.querySelector("#step-plan .selected-plan");
        const planName = selectedPlan.querySelector(".plan-txt h1").textContent;
        const planPrice = selectedPlan.querySelector(".plan-txt p").textContent;
        const planDurationToggle = document.querySelector(".duration i");
        const isYearly = planDurationToggle.classList.contains("fa-toggle-on");
        const planDuration = isYearly ? "Annually" : "Monthly";
        const planPriceValue = parseInt(planPrice.replace(/\D/g, ''));

        const summaryPlanName = document.querySelector("#step-finale .picked-plan h1");
        const summaryPlanPrice = document.querySelector("#step-finale .plan-choice > p");
        const summaryPlanDuration = document.querySelector("#step-finale .plan-time");

        summaryPlanName.textContent = planName;
        summaryPlanPrice.textContent = planPrice;
        summaryPlanDuration.textContent = `(${planDuration})`;

        const selectedPerks = document.querySelectorAll("#step-add .perks .selected");
        const perkChoiceContainer = document.querySelector("#step-finale .final-choice");

        document.querySelectorAll("#step-finale .perk-choice").forEach(perk => perk.remove());

        let totalMonthly = planPriceValue;
        selectedPerks.forEach(perk => {
            const perkName = perk.querySelector(".txt h1").textContent;
            const perkPrice = perk.querySelector(".add-on-price").textContent;
            const perkPriceValue = parseInt(perkPrice.replace(/\D/g, ''));
            totalMonthly += perkPriceValue;

            const perkChoice = document.createElement("div");
            perkChoice.classList.add("perk-choice");
            perkChoice.innerHTML = `<h1>${perkName}</h1><p>${perkPrice}</p>`;
            perkChoiceContainer.insertBefore(perkChoice, document.querySelector("#step-finale .total"));
        });

        const totalYearly = totalMonthly * 12;
        const totalDisplay = document.querySelector("#step-finale .total p");
        const timeDisplay = document.querySelector("#step-finale #time");

        timeDisplay.textContent = `(${planDuration.toLowerCase()})`;
        totalDisplay.textContent = isYearly ? `+$${totalYearly}/${planDuration.toLowerCase()}` : `+$${totalMonthly}/${planDuration.toLowerCase()}`;
    }

    document.querySelector("#step-add input[type='submit']").addEventListener("click", () => {
        updateSummary();
        currentStep++;
        showStep(currentStep);
    });

    document.querySelector("#step-finale .back-click").addEventListener("click", () => {
        currentStep--;
        showStep(currentStep);
    });

    document.querySelector("#step-finale input[type='submit']").addEventListener("click", () => {
        currentStep++;
        showStep(currentStep);
    });

    document.querySelector("#switch-plan").addEventListener("click", (event) => {
        event.preventDefault();
        currentStep = 1;
        showStep(currentStep);
    });
});