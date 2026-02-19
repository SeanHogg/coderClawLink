"""
Example demonstrating Phase 2 features: Transport Abstraction and Distributed Execution

This script shows how to:
1. Create a session
2. Submit a task through the runtime interface
3. Query task state
4. List agents and skills
"""

import asyncio
from app.transport.local_runtime import get_local_runtime
from app.transport.interface import TaskSubmission, TaskState
from app.security.session import get_session_manager
from app.security.rbac import get_rbac_manager, Role


async def main():
    print("=" * 70)
    print("Phase 2: Distributed AI Node - Feature Demonstration")
    print("=" * 70)
    print()
    
    # Initialize components
    runtime = get_local_runtime()
    session_manager = get_session_manager()
    rbac_manager = get_rbac_manager()
    
    # 1. Create a session
    print("1. Creating Session")
    print("-" * 70)
    session = session_manager.create_session(
        user_identity={"user_id": "demo-user@example.com"},
        device_id="demo-device-001"
    )
    print(f"✓ Session created: {session.session_id}")
    print(f"  User: {session.user_identity.get('user_id')}")
    print(f"  Device: {session.device_id}")
    print()
    
    # Assign role to user
    user_id = session.user_identity["user_id"]
    rbac_manager.assign_role(user_id, Role.DEVELOPER)
    print(f"✓ Assigned role 'DEVELOPER' to user")
    print()
    
    # 2. List available agents
    print("2. Available Agents")
    print("-" * 70)
    agents = await runtime.list_agents()
    for agent in agents:
        status = "✓ Available" if agent.available else "✗ Not configured"
        print(f"{status}: {agent.name} ({agent.agent_type})")
        if agent.description:
            print(f"           {agent.description}")
    print()
    
    # 3. List available skills
    print("3. Available Skills")
    print("-" * 70)
    skills = await runtime.list_skills()
    for skill in skills:
        print(f"• {skill.name} ({skill.skill_id})")
        if skill.description:
            print(f"  {skill.description}")
        if skill.required_permissions:
            print(f"  Required permissions: {', '.join(skill.required_permissions)}")
    print()
    
    # 4. Submit a task
    print("4. Submitting Task")
    print("-" * 70)
    submission = TaskSubmission(
        task_id="demo-task-001",
        agent_type="ollama",  # Use ollama as it's always available
        prompt="Explain what a distributed AI node is in one sentence",
        context={
            "demo": True,
            "phase": 2
        },
        session_id=session.session_id,
        user_identity=session.user_identity
    )
    
    print(f"Submitting task: {submission.task_id}")
    print(f"Agent: {submission.agent_type}")
    print(f"Prompt: {submission.prompt}")
    
    result = await runtime.submit_task(submission)
    print(f"✓ Task submitted with state: {result.state}")
    print()
    
    # 5. Query task state
    print("5. Monitoring Task State")
    print("-" * 70)
    
    # Wait a bit and check state multiple times
    for i in range(5):
        await asyncio.sleep(1)
        state = await runtime.query_task_state(submission.task_id)
        print(f"[{i+1}] Task state: {state.state}")
        
        if state.state in [TaskState.COMPLETED, TaskState.FAILED]:
            if state.success:
                print(f"✓ Task completed successfully!")
                if state.result:
                    print(f"Result preview: {state.result[:100]}...")
            else:
                print(f"✗ Task failed: {state.error}")
            break
    print()
    
    # 6. Session cleanup
    print("6. Cleanup")
    print("-" * 70)
    session_manager.delete_session(session.session_id)
    print(f"✓ Session {session.session_id} deleted")
    print()
    
    print("=" * 70)
    print("Phase 2 Feature Demonstration Complete!")
    print("=" * 70)


if __name__ == "__main__":
    print("\n")
    asyncio.run(main())
