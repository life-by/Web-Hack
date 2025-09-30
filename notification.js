<script>
// notification.js - সরাসরি কোড
(function() {
    'use strict';
    
    // GitHub রিপোজিটরি থেকে notifications.json লোড করার ফাংশন
    async function loadNotification() {
        try {
            // Cache busting এর জন্য টাইমস্ট্যাম্প যোগ করা
            const timestamp = new Date().getTime();
            const response = await fetch(`https://cdn.jsdelivr.net/gh/life-by/Web-Hack/notifications.json?v=${timestamp}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('নোটিফিকেশন লোড করতে সমস্যা:', error);
            return null;
        }
    }
    
    // নোটিফিকেশন বার তৈরি এবং দেখানোর ফাংশন
    function showNotification(message) {
        // যদি ইতিমধ্যে নোটিফিকেশন বার থাকে তবে সরানো
        const existingNotification = document.getElementById('website-notification-bar');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // নতুন নোটিফিকেশন বার তৈরি
        const notificationBar = document.createElement('div');
        notificationBar.id = 'website-notification-bar';
        notificationBar.className = 'notification-bar';
        
        notificationBar.innerHTML = `
            <div class="notification-content">${message}</div>
            <button class="close-btn" aria-label="বন্ধ করুন">&times;</button>
        `;
        
        // বডির শুরুতে যোগ করা
        document.body.insertBefore(notificationBar, document.body.firstChild);
        
        // বন্ধ বাটনে ইভেন্ট লিসেনার যোগ
        const closeBtn = notificationBar.querySelector('.close-btn');
        closeBtn.addEventListener('click', function() {
            notificationBar.remove();
            // স্থানীয়ভাবে স্টোর করা যে ব্যবহারকারী নোটিফিকেশন বন্ধ করেছে
            localStorage.setItem('notificationClosed', 'true');
        });
        
        // CSS স্টাইল যোগ (যদি ইতিমধ্যে না থাকে)
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    background-color: #4a6fa5;
                    color: white;
                    padding: 0.75rem 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 1000;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    font-family: system-ui, -apple-system, sans-serif;
                }
                
                .notification-content {
                    flex: 1;
                    margin-right: 1rem;
                }
                
                .notification-content a {
                    color: #ffeb3b;
                    text-decoration: underline;
                }
                
                .notification-content a:hover {
                    color: #ffff72;
                }
                
                .notification-bar .close-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: background-color 0.3s;
                }
                
                .notification-bar .close-btn:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                }
                
                body {
                    margin-top: 60px;
                }
                
                @media (max-width: 768px) {
                    .notification-bar {
                        padding: 0.5rem;
                        font-size: 0.9rem;
                    }
                    
                    body {
                        margin-top: 50px;
                    }
                    
                    .notification-bar .close-btn {
                        width: 25px;
                        height: 25px;
                        font-size: 1.2rem;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }
    
    // পৃষ্ঠা লোড হলে নোটিফিকেশন চেক করা
    document.addEventListener('DOMContentLoaded', async function() {
        // যদি ব্যবহারকারী ইতিমধ্যে নোটিফিকেশন বন্ধ করে থাকে তবে দেখানো হবে না
        if (localStorage.getItem('notificationClosed') === 'true') {
            return;
        }
        
        const notificationData = await loadNotification();
        
        if (notificationData && notificationData.active && notificationData.message) {
            showNotification(notificationData.message);
        }
    });
})();
</script>
