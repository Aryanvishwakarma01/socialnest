

document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.form');
    const formWrapper = document.querySelector('.form-wrapper');
    const tabIndicator = document.querySelector('.tab-indicator');
    const switchToLoginLink = document.querySelector('.switch-to-login');
    const themeToggle = document.querySelector('.theme-toggle');
    const darkIcon = document.querySelector('.dark-icon');
    const lightIcon = document.querySelector('.light-icon');
    
  
    
    // Check if user is already logged in
    checkAuthStatus();
    
    // Initialize theme based on system preference
    initializeTheme();

    // Initialize tab indicator position
    updateTabIndicator(document.querySelector('.tab-btn.active'));
    
    // Tab switching functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            switchTab(tabName, this);
        });
    });
    
    // Switch to login from register form link
    if(switchToLoginLink) {
        switchToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            const loginTab = document.querySelector('[data-tab="login"]');
            switchTab('login', loginTab);
        });
    }
    
    // Theme toggle functionality
    if(themeToggle) {
        themeToggle.addEventListener('click', function() {
            toggleTheme();
        });
    }
    
    // Function to check authentication status
    
    
    // Function to initialize theme based on system preference
    function initializeTheme() {
        // Check if user has a saved preference
        const savedTheme = localStorage.getItem('theme');
        
        if (savedTheme) {
            // Apply saved preference
            document.body.classList.toggle('dark-mode', savedTheme === 'dark');
            updateThemeIcons(savedTheme === 'dark');
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.body.classList.toggle('dark-mode', prefersDark);
            updateThemeIcons(prefersDark);
        }
    }
    
    // Function to toggle between light and dark theme
    function toggleTheme() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        updateThemeIcons(isDarkMode);
        
        // Save user preference
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
    
    // Function to update theme icons
    function updateThemeIcons(isDarkMode) {
        if (isDarkMode) {
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'inline-block';
        } else {
            darkIcon.style.display = 'inline-block';
            lightIcon.style.display = 'none';
        }
    }
    
    // Function to switch tabs with animation
    function switchTab(tabName, tabBtn) {
        // Return if already active
        if(tabBtn.classList.contains('active')) return;
        
        // Update tab buttons
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabBtn.classList.add('active');
        
        // Update tab indicator
        updateTabIndicator(tabBtn);
        
        // Get current and target forms
        const currentForm = document.querySelector('.form.active');
        const targetForm = document.getElementById(`${tabName}-form`);
        
        if (!targetForm) {
            console.error(`Form with ID "${tabName}-form" not found`);
            return;
        }
        
        // Determine direction (left or right)
        const isMovingLeft = tabName === 'login';
        
        // Animation for current form (slide out)
        currentForm.style.transform = `translateX(${isMovingLeft ? '50px' : '-50px'})`;
        currentForm.style.opacity = '0';
        
        // After a short delay, hide current and show target
        setTimeout(() => {
            currentForm.classList.remove('active');
            
            // Position target form for entrance animation
            targetForm.style.transform = `translateX(${isMovingLeft ? '-50px' : '50px'})`;
            targetForm.style.opacity = '0';
            targetForm.classList.add('active');
            
            // Trigger entrance animation
            setTimeout(() => {
                targetForm.style.opacity = '1';
                targetForm.style.transform = 'translateX(0)';
            }, 50);
        }, 300);
    }
    
    // Function to update tab indicator position
    function updateTabIndicator(activeTab) {
        const tabWidth = activeTab.offsetWidth;
        const tabLeft = activeTab.offsetLeft;
        
        tabIndicator.style.width = `${tabWidth}px`;
        tabIndicator.style.left = `${tabLeft}px`;
    }
    
    // Handle form submissions with Appwrite authentication
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formType = this.id === 'login-form' ? 'login' : 'registration';
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Processing...`;
            
            try {
                if (formType === 'login') {
                    // Handle login
                    const email = this.querySelector('input[type="email"]').value;
                    const password = this.querySelector('input[type="password"]').value;

                    try {
                        await account.deleteSessions()
                    } catch (error) {
                        
                    }
                    
                    // Appwrite email session login
                    await account.createEmailSession(email, password);
                    console.log('Login successful');
                    
                    // Handle successful login (e.g., redirect to dashboard)
                    handleSuccessfulAuth('Login successful!'); 
                    
                    
                } else {
                    // Handle registration
                    const name = this.querySelector('input[id="full-name"]')?.value || '';
                    const username = this.querySelector('input[id="user-name"]')?.value || '';
                    const email = this.querySelector('input[type="email"]').value;
                    const password = this.querySelector('input[type="password"]').value;
                    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundColor=ff5733&fontSize=50`
                    
                    // Create user in Appwrite
                    const user = await account.create(ID.unique(), email, password, name);
                    console.log('Registration successful:', user);
                    
                    try {
                        await account.deleteSessions()
                    } catch (error) {
                        
                    }
                    // Auto login after registration
                    await account.createEmailSession(email, password);
                    await account.updatePrefs({username, avatar})
                    console.log("You are logged in Successfully")
                    handleSuccessfulAuth('Login successful!'); 

                }
                
            } catch (error) {
                console.error(`${formType} error:`, error);
                
                // Reset button state
                submitBtn.innerHTML = originalText;
                
                // Show error message
                const errorMessage = getErrorMessage(error, formType);
                showAuthError(errorMessage);
            }
        });
    });
    
    // Function to handle successful authentication
    function handleSuccessfulAuth(message) {
        alert(message);
        
        // Here you can redirect the user to a dashboard or protected page
        window.location.href = 'homepage.html';
        
        // Or update UI to show logged in state
        // This is placeholder functionality - implement based on your application needs
    }
    
    // Function to show authentication errors
    function showAuthError(message) {
        // You can implement a nicer UI for error messages
        alert(message);
    }
    
    // Function to get user-friendly error messages
    function getErrorMessage(error, formType) {
        // This function maps Appwrite error codes to user-friendly messages
        
        if (error.code) {
            switch (error.code) {
                case 401:
                    return 'Invalid email or password.';
                case 409:
                    return 'An account with this email already exists.';
                case 400:
                    if (error.message.includes('password')) {
                        return 'Password must be at least 8 characters.';
                    }
                    return error.message;
                default:
                    return error.message || `${formType} failed. Please try again.`;
            }
        }
        
        return `${formType} failed. Please try again.`;
    }
    
    // Function to handle logout
    function handleLogout() {
        account.deleteSession('current')
            .then(() => {
                console.log('Logout successful');
                // Redirect to login page or update UI
                // window.location.href = '/login.html';
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Only apply if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            document.body.classList.toggle('dark-mode', e.matches);
            updateThemeIcons(e.matches);
        }
    });
    
    // Add window resize listener to update tab indicator
    window.addEventListener('resize', function() {
        const activeTab = document.querySelector('.tab-btn.active');
        updateTabIndicator(activeTab);
    });
    
    // Optional: Add a logout button event listener
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});