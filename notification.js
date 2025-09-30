// notification.js - ক্লায়েন্ট-সাইড স্ক্রিপ্ট
(function() {
    'use strict';
    
    // GitHub রিপোজিটরি থেকে notifications.json লোড করার ফাংশন
    async function loadNotification() {
        try {
            // Cache busting এর জন্য টাইমস্ট্যাম্প যোগ করা
            const timestamp = new Date().getTime();
            const response = await fetch(`https://cdn.jsdelivr.net/gh/your-username/your-repository@main/notifications.json?v=${timestamp}`);
            
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
                }
                
                .notification-content {
                    flex: 1;
                    margin-right: 1rem;
                }
                
                .notification-bar .close-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    width: auto;
                    padding: 0;
                    flex: 0 0 auto;
                }
                
                .notification-bar .close-btn:hover {
                    color: #ffcccb;
                }
                
                body {
                    margin-top: 60px; /* নোটিফিকেশন বারের জন্য স্থান */
                }
                
                @media (max-width: 768px) {
                    .notification-bar {
                        padding: 0.5rem;
                    }
                    
                    body {
                        margin-top: 50px;
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
